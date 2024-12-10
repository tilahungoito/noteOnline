"use server";
import connectdb from "@/lib/connectdb";
import Note from "@/lib/models/note.model";

export interface noteparam
{
  title: string;
  description: string;
  id?: string;

}

async function addAndUpdate({ title, description, id }: noteparam): Promise<void>
{
  try
  {
    console.log("Connecting to MongoDB...");
    await connectdb();
    console.log("Connected to MongoDB");

    if (id)
    {
      console.log("Updating note with ID:", id);
      await Note.findOneAndUpdate(
        { _id: id }, // Search for the note by its ID
        { title, description }, // Update fields
        { upsert: true } // If not found, create a new one
      );
      console.log("Note updated successfully");
    } else
    {
      console.log("Creating a new note...");
      const newNote = new Note({ title, description });
      await newNote.save();
      console.log("Note created successfully");
    }
  } catch (error: any)
  {
    console.error("Error in addAndUpdate:", error.message);
    throw new Error(`Failed to add or update note: ${error.message}`);
  }
}

export default addAndUpdate;

async function fetchNotes()
{
  try
  {
    connectdb();
    const notes = await Note.find({});
    // Convert notes to JSON-compatible objects
    return JSON.parse(JSON.stringify(notes));

  } catch (error: any)
  {
    console.log(`filled to fetch notes: ${error.message}`);

  }

}
export { fetchNotes };


async function deleter(id: string)
{
  try
  {
    connectdb();

    const notes = await Note.findByIdAndDelete(id)
    // Convert notes to JSON-compatible objects
    return JSON.parse(JSON.stringify(notes));
  }
  catch (error: any)
  {
    console.log(`failled to delete note: ${error.message}`);
  }
}
export { deleter };


async function searcher(query: string)
{
  try
  {
    // Connect to the database
    connectdb();

    // Search notes with a title or description containing the query
    const notes = await Note.find({
      $or: [
        { title: { $regex: query, $options: "i" } }, // Case-insensitive search in title
        { description: { $regex: query, $options: "i" } }, // Case-insensitive search in description
      ],
    });

    // Convert notes to JSON-compatible objects
    return JSON.parse(JSON.stringify(notes));
  } catch (error: any)
  {
    console.error(`Failed to search notes: ${error.message}`);
    return [];
  }
}

export { searcher };

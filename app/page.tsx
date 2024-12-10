"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleter, fetchNotes, searcher } from "@/lib/actions/note.action";
import addAndUpdate from "@/lib/actions/note.action";
import { useEffect, useState } from "react";
import { FiCopy, FiDelete, FiEdit, FiShare } from "react-icons/fi";

interface Note
{
  _id: string;
  title: string;
  description: string;
  createdAt?: Date;
}

const NotesList = () =>
{
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedNotes, setExpandedNotes] = useState<Set<string>>(new Set());

  useEffect(() =>
  {
    const getNotes = async () =>
    {
      const fetchedNotes = await fetchNotes();
      setNotes(fetchedNotes);
      setLoading(false);
    };

    getNotes();
  }, []); // Runs once on mount

  const toggleExpand = (id: string) =>
  {
    setExpandedNotes((prevExpanded) =>
    {
      const newExpanded = new Set(prevExpanded);
      if (newExpanded.has(id))
      {
        newExpanded.delete(id); // Collapse if already expanded
      } else
      {
        newExpanded.add(id); // Expand if not already expanded
      }
      return newExpanded;
    });
  };

  const handleUpdate = async (id: string) =>
  {
    const title = prompt("Enter updated title:") || "";
    const description = prompt("Enter updated description:") || "";

    if (title && description)
    {
      try
      {
        await addAndUpdate({ id, title, description });
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === id ? { ...note, title, description } : note
          )
        );
        alert("Note updated successfully!");
      } catch (error)
      {
        console.error("Error updating note:", error);
        alert("Failed to update note.");
      }
    }
  };

  const handleDelete = async (id: string) =>
  {
    if (confirm("Are you sure you want to delete this note?"))
    {
      try
      {
        await deleter(id);
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
        alert("Note deleted successfully!");
      } catch (error)
      {
        console.error("Error deleting note:", error);
        alert("Failed to delete note.");
      }
    }
  };
  const handleSearch = async (searchQuery: string) =>
  {
    if (!searchQuery.trim())
    {
      alert("Please enter a search term.");
      return;
    }

    try
    {
      const results = await searcher(searchQuery);
      setNotes(results); // Update displayed notes with search results
    } catch (error)
    {
      console.error("Error searching notes:", error);
      alert("Failed to search notes.");
    }
  };
  const handleCopy = (note: Note) =>
  {
    navigator.clipboard.writeText(`${note.title}\n${note.description}`);
    alert("Note copied to clipboard!");
  };

  const handleShare = async (note: Note) =>
  {
    if (navigator.share)
    {
      try
      {
        await navigator.share({
          title: note.title,
          text: note.description,
        });
        alert("Note shared successfully!");
      } catch (error)
      {
        console.error("Error sharing note:", error);
        alert("Failed to share note.");
      }
    } else
    {
      alert("Sharing is not supported on this browser.");
    }
  };

  if (loading)
  {
    return <p>Loading notes...</p>;
  }

  return (
    <section className=" padding-8">
      <div className="flex justify-between items-center"  >
        <h1 className="font-bold text-2xl ml-10 text-center after:backdrop:">Your Notes</h1>
        <Input className="bg-slate-900 w-20 border-r-gray-50 mr-10" placeholder="Search" onChange={(e) => handleSearch(e.target.value)} />
      </div>
      {notes.map((note: Note) =>
      {
        const isExpanded = expandedNotes.has(note._id);
        const displayedDescription = isExpanded
          ? note.description
          : `${note.description.slice(0, 100)}${note.description.length > 100 ? "..." : ""}`;

        return (
          <div className="px-2 mx-10 my-2"
            key={note._id}
            style={{
              borderLeft: "1px solid #ccc",

            }}
          >
            <h3>{note.title}</h3>
            <p>
              {displayedDescription}{" "}
              {note.description.length > 100 && (
                <button
                  onClick={() => toggleExpand(note._id)}
                  style={{ color: "blue", textDecoration: "underline", border: "none", background: "none", cursor: "pointer" }}
                >
                  {isExpanded ? "See Less" : "See More"}
                </button>
              )}
            </p>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <Button onClick={() => handleUpdate(note._id)}><FiEdit /></Button>
              <Button onClick={() => handleDelete(note._id)}><FiDelete /></Button>
              <Button onClick={() => handleCopy(note)}><FiCopy /></Button>
              <Button onClick={() => handleShare(note)}> <FiShare /></Button>
            </div>
            {note.createdAt && "at: " + note.createdAt}
          </div>
        );
      })}
    </section>
  );
};

export default NotesList;

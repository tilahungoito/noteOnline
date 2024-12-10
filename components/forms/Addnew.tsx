"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import
{
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import formSchema from "@/lib/validations/formSchema"
import addAndUpdate from "@/lib/actions/note.action"
import { useRouter } from "next/navigation";


export default function Addnew()
{
    const router = useRouter();
    // ...

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    })
    const onSave = async (data: z.infer<typeof formSchema>) =>
    {

        try
        {
            // Call the action to save or update the note
            await addAndUpdate({
                title: data.title,
                description: data.description,
                // Optionally include an `id` if editing an existing note
            });
            console.log("Note saved successfully:", data);
            router.push("/");
        } catch (error)
        {
            console.error("Failed to save note:", error);
        }
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSave)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>event_title</FormLabel>
                            <FormControl>
                                <Input placeholder="title or event" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>details</FormLabel>
                            <FormControl>
                                <Textarea rows={5}
                                    placeholder="take the time notes" {...field} />
                            </FormControl>
                            <FormDescription>

                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">save</Button>
            </form>
        </Form>
    )
}

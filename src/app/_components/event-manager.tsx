"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export function EventManager() {
  const utils = api.useUtils();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [status, setStatus] = useState<"PLANNED" | "CANCELLED" | "COMPLETED">("PLANNED");

  const createEvent = api.event.create.useMutation({
    onSuccess: async () => {
      await utils.event.getAll.invalidate();
      setTitle("");
      setDescription("");
      setDate("");
      setLocation("");
      setTags("");
      setIsPublic(true);
      setStatus("PLANNED");
    },
  });

  const [events] = api.event.getAll.useSuspenseQuery();

  return (
    <div className="w-full max-w-xl space-y-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createEvent.mutate({
            title,
            description,
            date,
            location,
            tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
            isPublic,
            status,
          });
        }}
        className="flex flex-col gap-3"
      >
        <h2 className="text-xl font-bold text-white">Create New Event</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded bg-white/10 px-4 py-2 text-white"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="rounded bg-white/10 px-4 py-2 text-white"
        />
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded bg-white/10 px-4 py-2 text-white"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="rounded bg-white/10 px-4 py-2 text-white"
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="rounded bg-white/10 px-4 py-2 text-white"
        />
        <div className="flex items-center gap-3">
          <label className="text-white">Public:</label>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
          className="rounded bg-white text-black px-3 py-2"
        >
          <option value="PLANNED">Planned</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="COMPLETED">Completed</option>
        </select>
        <button
          type="submit"
          className="rounded bg-white/10 px-6 py-2 font-semibold text-white hover:bg-white/20 transition"
          disabled={createEvent.isPending}
        >
          {createEvent.isPending ? "Creating..." : "Create Event"}
        </button>
      </form>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Upcoming Events</h3>
        {events.length === 0 ? (
          <p className="text-white/70">No events yet.</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="rounded bg-white/5 p-4 text-white">
              <h4 className="text-lg font-bold">{event.title}</h4>
              <p className="text-sm text-white/80">
                {new Date(event.date).toLocaleString()} — {event.location}
              </p>
              {event.tags.length > 0 && (
                <p className="text-xs text-white/60 italic">Tags: {event.tags.join(", ")}</p>
              )}
              {event.description && <p className="mt-2">{event.description}</p>}
              <p className="text-xs mt-1 text-white/60">Status: {event.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

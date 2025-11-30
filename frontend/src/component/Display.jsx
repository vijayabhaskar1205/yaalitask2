import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const Display = () => {
  const API = import.meta.env.VITE_API_URL;
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);

  
  const { data: notes = [] } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const res = await axios.get(`${API}/getall`);
      return res.data;
    },
  });

  const addNoteMutation = useMutation({
    mutationFn: async (newNote) => {
      const res = await axios.post(`${API}/notepost`, newNote);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setTitle("");
      setDescription("");
    },
    onError: (err) => {
      console.error("Error adding note:", err);
    },
  });

  const handleAddNote = (e) => {
    e.preventDefault();
    addNoteMutation.mutate({ title, description });
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!search) {
        setFilteredNotes(notes);
        return;
      }
      try {
        const res = await axios.get(`${API}/search?title=${search}`);
        setFilteredNotes(res.data);
      } catch (err) {
        console.error(err);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [search, notes]);

 
  return (
    
    <div className="flex flex-col md:flex-row h-screen bg-slate-100 font-sans overflow-hidden">
  
      <div className="w-full md:w-120 bg-white shadow-xl z-20 flex flex-col p-6 md:p-8 md:h-full md:overflow-y-auto shrink-0 border-r border-slate-200">
        
      
        <div className="mb-6 text-center md:text-left">
          <h1 className="font-extrabold text-3xl text-indigo-600 tracking-tight">
            Notes App
          </h1>
          <p className="text-slate-400 text-sm mt-1">Capture your ideas</p>
        </div>

       
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
          />
        </div>

        
        <form className="flex flex-col gap-4" onSubmit={handleAddNote}>
          <div className="space-y-1">
             <label className="text-xs font-bold text-slate-500 uppercase">Title</label>
             <input
              type="text"
              placeholder="e.g. Meeting Notes"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              required
            />
          </div>
         
          <div className="space-y-1">
             <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
             <textarea
              rows={4}
              placeholder="Write something..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg transform active:scale-95 transition-all duration-200"
          >
            {addNoteMutation.isPending ? "Saving..." : "Save Note"}
          </button>
        </form>
      </div>

   
      <div className="flex-1 h-full overflow-y-auto bg-slate-50 p-4 md:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-2xl text-slate-800">Your Notes</h2>
            <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-slate-500 shadow-sm border border-slate-200">
               {filteredNotes.length} Found
            </span>
          </div>

        
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            {filteredNotes.map((note) => (
              <div
                key={note._id}
                className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-fit"
              >
                <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-lg text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1">
                       Title: {note.title}
                    </h3>
                    
                   
                </div>
                <p className="text-slate-500 text-sm leading-relaxed whitespace-pre-wrap wrap-break-words">
                 Description: {note.description}
                </p>
              </div>
            ))}
           
            {filteredNotes.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-20 opacity-60">
                <svg className="w-16 h-16 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                <p className="text-lg text-slate-500 font-medium">No notes found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display;
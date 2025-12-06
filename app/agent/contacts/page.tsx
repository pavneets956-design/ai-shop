"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Phone, Building, Trash2, Edit } from "lucide-react";
import Link from "next/link";
import AgentCallButton from "@/components/AgentCallButton";

interface Contact {
  id: string;
  company: string;
  contactName: string | null;
  phone: string;
  email: string | null;
  industry: string | null;
  status: "new" | "contacted" | "interested" | "scheduled" | "not-interested";
  createdAt?: string;
  updatedAt?: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newContact, setNewContact] = useState({
    company: "",
    contactName: "",
    phone: "",
    email: "",
    industry: "",
  });

  // Fetch contacts from database
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/agent/contacts");
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      } else {
        console.error("Failed to fetch contacts");
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (contact.contactName?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/agent/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContact),
      });

      if (response.ok) {
        const contact = await response.json();
        setContacts([contact, ...contacts]);
        setNewContact({
          company: "",
          contactName: "",
          phone: "",
          email: "",
          industry: "",
        });
        setShowAddForm(false);
      } else {
        const error = await response.json();
        alert(`Failed to add contact: ${error.error}`);
      }
    } catch (error) {
      console.error("Error adding contact:", error);
      alert("Failed to add contact. Please try again.");
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact?")) {
      return;
    }

    try {
      const response = await fetch(`/api/agent/contacts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setContacts(contacts.filter((c) => c.id !== id));
      } else {
        alert("Failed to delete contact");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Failed to delete contact. Please try again.");
    }
  };

  const getStatusColor = (status: Contact["status"]) => {
    switch (status) {
      case "interested":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "scheduled":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "contacted":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "not-interested":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default:
        return "bg-white/10 text-gray-400 border-white/10";
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 pt-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12 flex justify-between items-center">
          <div>
            <Link
              href="/agent"
              className="text-sm text-gray-400 hover:text-white mb-4 inline-block transition-colors font-light"
            >
              ← Back to Agent
            </Link>
            <h1 className="text-5xl font-light text-white mb-4">Manage Contacts</h1>
            <p className="text-lg text-gray-400 font-light">Add and organize companies to call</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Contact
          </button>
        </div>

        {/* Add Contact Form */}
        {showAddForm && (
          <div className="border border-white/10 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-light text-white mb-6">Add New Contact</h2>
            <form onSubmit={handleAddContact} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-light text-gray-400 mb-2">Company Name *</label>
                <input
                  type="text"
                  required
                  value={newContact.company}
                  onChange={(e) => setNewContact({ ...newContact, company: e.target.value })}
                  className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg focus:ring-1 focus:ring-white/20 focus:border-white/20 text-white placeholder-gray-500 font-light"
                  placeholder="Tech Solutions Inc"
                />
              </div>
              <div>
                <label className="block text-sm font-light text-gray-400 mb-2">Contact Name *</label>
                <input
                  type="text"
                  required
                  value={newContact.contactName}
                  onChange={(e) => setNewContact({ ...newContact, contactName: e.target.value })}
                  className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg focus:ring-1 focus:ring-white/20 focus:border-white/20 text-white placeholder-gray-500 font-light"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-light text-gray-400 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg focus:ring-1 focus:ring-white/20 focus:border-white/20 text-white placeholder-gray-500 font-light"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-light text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  value={newContact.email}
                  onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                  className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg focus:ring-1 focus:ring-white/20 focus:border-white/20 text-white placeholder-gray-500 font-light"
                  placeholder="john@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-light text-gray-400 mb-2">Industry</label>
                <input
                  type="text"
                  value={newContact.industry}
                  onChange={(e) => setNewContact({ ...newContact, industry: e.target.value })}
                  className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg focus:ring-1 focus:ring-white/20 focus:border-white/20 text-white placeholder-gray-500 font-light"
                  placeholder="Technology, Healthcare, Legal, etc."
                />
              </div>
              <div className="flex items-end gap-4">
                <button type="submit" className="btn-primary flex-1">
                  Add Contact
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-transparent border border-white/10 rounded-lg focus:ring-1 focus:ring-white/20 focus:border-white/20 text-white placeholder-gray-500 font-light"
            />
          </div>
        </div>

        {/* Contacts List */}
        {loading ? (
          <div className="border border-white/10 rounded-lg p-12 text-center">
            <p className="text-gray-400 font-light">Loading contacts...</p>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="border border-white/10 rounded-lg p-12 text-center">
            <p className="text-gray-400 font-light">
              {searchQuery ? "No contacts found matching your search." : "No contacts yet. Add your first contact above."}
            </p>
          </div>
        ) : (
          <div className="border border-white/10 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-6 font-light text-gray-400 text-sm">Company</th>
                  <th className="text-left py-4 px-6 font-light text-gray-400 text-sm">Contact</th>
                  <th className="text-left py-4 px-6 font-light text-gray-400 text-sm">Phone</th>
                  <th className="text-left py-4 px-6 font-light text-gray-400 text-sm">Industry</th>
                  <th className="text-left py-4 px-6 font-light text-gray-400 text-sm">Status</th>
                  <th className="text-left py-4 px-6 font-light text-gray-400 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-gray-400" />
                        <span className="font-light text-white">{contact.company}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-400 font-light">{contact.contactName || "-"}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-gray-400 font-light">
                        <Phone className="w-3 h-3" />
                        {contact.phone}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-400 font-light">{contact.industry || "-"}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded text-xs font-light border ${getStatusColor(contact.status)}`}>
                        {contact.status.charAt(0).toUpperCase() + contact.status.slice(1).replace("-", " ")}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <AgentCallButton
                          contactId={contact.id}
                          phoneNumber={contact.phone}
                          companyName={contact.company}
                        />
                        <button className="p-2 text-gray-400 hover:text-white transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteContact(contact.id)}
                          className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}


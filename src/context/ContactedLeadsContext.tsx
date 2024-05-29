import { ReactNode, createContext, useContext, useState } from "react";

interface ContactedLeadsContextType {
  contactedLeads: Set<string>;
  toggleContacted: (leadId: string) => void;
  isContacted: (leadId: string) => boolean;
}

const ContactedLeadsContext = createContext<ContactedLeadsContextType | undefined>(undefined);

export function ContactedLeadsProvider({ children }: { children: ReactNode }) {
  const [contactedLeads, setContactedLeads] = useState<Set<string>>(new Set());

  const toggleContacted = (leadId: string) => {
    setContactedLeads((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(leadId)) {
        newSet.delete(leadId);
      } else {
        newSet.add(leadId);
      }
      return newSet;
    });
  };

  const isContacted = (leadId: string) => contactedLeads.has(leadId);

  return (
    <ContactedLeadsContext.Provider value={{ contactedLeads, toggleContacted, isContacted }}>
      {children}
    </ContactedLeadsContext.Provider>
  );
}

export const useContactedLeads = (): ContactedLeadsContextType => {
  const context = useContext(ContactedLeadsContext);
  if (context === undefined) {
    throw new Error("useContactedLeads must be used within a ContactedLeadsProvider");
  }
  return context;
};

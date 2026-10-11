import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Tristan Cooper about projects and opportunities.",
};

export default function ContactPage() {
  return (
    <div className="max-w-none">
      <h1 className="m-0 text-2xl sm:text-3xl font-normal leading-tight">Contact</h1>
      <div className="mt-4">
        <ContactForm />
      </div>
    </div>
  );
}

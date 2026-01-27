export default function ContactProfileSidebar({ contact }) {
  return (
    <div className="w-72 border-l bg-white p-4">
      <h3 className="font-semibold mb-4">Contact</h3>

      <p className="text-sm">
        <strong>Name:</strong> {contact.name}
      </p>
      <p className="text-sm">
        <strong>Phone:</strong> {contact.phone}
      </p>
      <p className="text-sm">
        <strong>Email:</strong> {contact.email || "-"}
      </p>
    </div>
  );
}

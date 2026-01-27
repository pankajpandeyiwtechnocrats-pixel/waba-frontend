import Papa from "papaparse";
import { useEffect, useState } from "react";

export default function CSVImportPreview({
  file,
  onConfirm,
  onCancel,
}) {
  const [valid, setValid] = useState([]);
  const [invalid, setInvalid] = useState([]);

  useEffect(() => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const phones = new Set();
        const validRows = [];
        const invalidRows = [];

        results.data.forEach((row, index) => {
          if (!row.name || !row.phone) {
            invalidRows.push({
              row: index + 1,
              error: "Name or phone missing",
            });
            return;
          }

          if (row.phone.length < 8) {
            invalidRows.push({
              row: index + 1,
              error: "Invalid phone",
            });
            return;
          }

          if (phones.has(row.phone)) {
            invalidRows.push({
              row: index + 1,
              error: "Duplicate phone",
            });
            return;
          }

          phones.add(row.phone);
          validRows.push({
            name: row.name,
            phone: row.phone,
            email: row.email,
          });
        });

        setValid(validRows);
        setInvalid(invalidRows);
      },
    });
  }, [file]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[700px] max-h-[80vh] overflow-auto p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">
          Import Preview
        </h2>

        <p className="text-sm mb-2">
          ✅ Valid: {valid.length} | ❌ Invalid: {invalid.length}
        </p>

        {invalid.length > 0 && (
          <div className="mb-4 text-sm text-red-600">
            {invalid.map((e, i) => (
              <div key={i}>
                Row {e.row}: {e.error}
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            disabled={valid.length === 0}
            onClick={() => onConfirm(valid)}
            className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Import {valid.length} Contacts
          </button>
        </div>
      </div>
    </div>
  );
}

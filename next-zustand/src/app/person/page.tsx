'use client';
import { usePersonStore } from '@/store/person';
export default function PersonPage() {
  const { firstName, lastName, updateFirstName, updateLastName } =
    usePersonStore();

  return (
    <div>
      <div className="text-2xl font-bold">
        PersonPage {firstName} {lastName}
      </div>
      <div>
        <input
          type="text"
          value={firstName}
          onChange={(e) => updateFirstName(e.target.value)}
          className="border-2 border-gray-300 rounded-md p-2"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => updateLastName(e.target.value)}
          className="border-2 border-gray-300 rounded-md p-2"
        />
      </div>
    </div>
  );
}

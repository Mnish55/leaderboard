'use client';
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export const Container = () => {
  // Fetch students from Convex database
  const students = useQuery(api.student.getStudents);

  // Handle loading state
  if (students === undefined) {
    return (
      <div className="p-4">
        <Card className="w-full max-w-full shadow-md rounded-lg">
          <CardContent className="p-8 text-center">
            <div className="animate-pulse">Loading students...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Handle empty state
  if (!students || students.length === 0) {
    return (
      <div className="p-4">
        <Card className="w-full max-w-full shadow-md rounded-lg">
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">No students found. Add some students to get started!</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalMarks = 10

  return (
    <div className="p-4">
      <Card className="w-full max-w-full overflow-auto shadow-md rounded-lg">
        <CardContent className="p-0">
          <div className="w-max h-max overflow-auto">
            <table className="table-auto border border-gray-300 min-w-max">
              <thead>
                <tr>
                  {students.map((student, index) => (
                    <th
                      key={student.id || index}
                      className="border px-4 py-2 bg-gray-200 text-center whitespace-nowrap"
                    >
                      {student.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {students.map((student, index) => (
                    <td
                      key={student.id || index}
                      className="border px-4 py-2 text-center"
                    >
                      {0}
                    </td>
                  ))}
                </tr>
                <tr>
                  {students.map((student, index) => (
                    <td
                      key={`total-${student.id || index}`}
                      className={`border px-4 py-3.5 text-center font-semibold ${
                        index === 0 ? 'bg-blue-100 text-blue-800' : ''
                      }`}
                    >
                      {index === 0 ? 'Total Marks' : ''}
                      {index === 1 ? totalMarks : ''}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
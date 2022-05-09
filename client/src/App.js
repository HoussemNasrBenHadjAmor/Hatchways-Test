import { useEffect, useState } from "react";

import { getStudents } from "./lib/hatchways";

import { Student } from "./components";

const App = () => {
  const [students, setStudents] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTag, setSearchTag] = useState("");

  const getStudentData = async () => {
    const data = await getStudents();
    setStudents(data);
  };

  useEffect(() => {
    getStudentData();
  }, []);

  //---------firstName or lastName or FullName or FullNameReverse Array

  const nameFilter = (filterString) => {
    let filtered = [];

    students?.forEach((student) => {
      const fullName = [student.firstName, student.lastName]
        .join(" ")
        .toLowerCase()
        .includes(filterString);

      const fullNameReverse = [student.lastName, student.firstName]
        .join(" ")
        .toLowerCase()
        .includes(filterString);

      if (!filterString || fullName || fullNameReverse) {
        filtered.push(student);
      }
    });
    return filtered;
  };

  //--------SearchTag Array

  const searchTags = (tagInput) => {
    let searchTagsArray = [];

    students?.forEach((student) => {
      let tagExists = false;
      student?.tags?.forEach((t) => {
        if (t.toLowerCase().includes(tagInput)) {
          tagExists = true;
        }
      });

      if (!tagInput || tagExists) {
        searchTagsArray.push(student);
      }
    });
    return searchTagsArray;
  };

  const filteredByNameStudents = nameFilter(searchTerm.toLowerCase());
  const filteredByTagStudents = searchTags(searchTag.toLowerCase());
  const combinedFilteredStudents = [];

  //-------------- Combine Search and fullName

  filteredByNameStudents?.map(
    (student) =>
      filteredByTagStudents?.includes(student) &&
      combinedFilteredStudents.push(student)
  );

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col w-full max-w-5xl mx-auto h-full sm:mx-5 sm:max-h-[500px] 2xl:max-h-[640px] bg-white rounded-lg shadow-xl gap-3 pb-5">
        <div className="flex flex-col gap-3 mt-3 px-5">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            placeholder="Search by first name, last name, or full name"
            className="w-full p-2 outline-none border-b-2 focus:border-black"
          />

          <input
            onChange={(e) => setSearchTag(e.target.value)}
            value={searchTag}
            placeholder="Search by tag"
            className="w-full p-2 outline-none border-b-2 focus:border-black"
          />
        </div>

        <div className="overflow-y-auto">
          {combinedFilteredStudents?.map((s) => (
            <Student
              student={s}
              key={`student-${s.id}`}
              students={students}
              setStudents={setStudents}
            />
          ))}

          {combinedFilteredStudents?.length === 0 && (
            <div className="flex justify-center items-center mt-10">
              <p>Sorry, no results were found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

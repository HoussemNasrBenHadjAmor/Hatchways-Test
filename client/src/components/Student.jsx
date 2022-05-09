import { useState } from "react";

import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";

const Student = ({
  student: {
    company,
    email,
    skill,
    grades,
    pic,
    firstName,
    lastName,
    id,
    tags,
  },
  students,
  setStudents,
}) => {
  const [open, setOpen] = useState(false);
  const [tagsA, settagsA] = useState([]);
  const [tag, setTag] = useState("");

  const calculAverge = () => {
    let total = 0;
    grades.map((g) => (total = total + parseInt(g)));
    return total;
  };

  const averge = calculAverge() / grades?.length;

  const addTag = (e) => {
    if (e.key === "Enter") {
      const tag = e.target.value.toLowerCase();
      settagsA([...tagsA, tag]);
      setStudents(
        students?.map((s) =>
          s.id === id ? { ...s, tags: [...tagsA, tag] } : s
        )
      );
      setTag("");
    }
  };

  return (
    <div className="md:flex md:justify-between p-4 border-b-2">
      <div className="md:flex gap-10">
        <div className="md:w-36 md:h-36 w-full h-full">
          <img
            src={pic}
            alt="student-profile"
            className="w-full h-full rounded-full border-2"
          />
        </div>

        <div className="flex flex-col gap-3 md:px-5 mt-5 md:mt-0 flex-1">
          <h1 className="text-4xl md:text-5xl font-bold md:-mx-5">
            {firstName.toUpperCase()} {lastName.toUpperCase()}
          </h1>

          <div className=" text-gray-600">
            <p> Email: {email} </p>
            <p> Company: {company} </p>
            <p> Skill: {skill} </p>
            <p> Averge: {averge}% </p>
          </div>

          {open && (
            <div className="flex flex-col gap-1">
              {grades?.map((g, i) => (
                <div className="flex items-center gap-5" key={`grade-${i}`}>
                  <p>Test {i + 1}:</p>
                  <p>{g}%</p>
                </div>
              ))}
            </div>
          )}

          {tags && (
            <div className="flex flex-wrap items-center gap-1">
              {tags?.map((t, i) => (
                <div className="rounded-md bg-gray-300 p-2" key={`tag-${i}`}>
                  <p>{t}</p>
                </div>
              ))}
            </div>
          )}

          <div>
            <input
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="Add a tag"
              onKeyDown={addTag}
              className="py-2 outline-none border-b-2 focus:border-black"
            />
          </div>
        </div>
      </div>

      <div className="text-gray-400 mt-5 md:mt-0">
        <button onClick={() => setOpen(!open)}>
          {!open ? (
            <PlusSmIcon className="w-10 h-10" />
          ) : (
            <MinusSmIcon className="w-10 h-10" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Student;

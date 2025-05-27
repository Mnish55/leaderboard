import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addStudent = mutation({
  args: {
    name: v.string(),
    marks: v.array(v.number())
  },
  handler: async (ctx, args) => {

    const studentId = await ctx.db.insert("students", {
      ...args,
    });

    return studentId
  },
});

export const addZero = mutation({
  args: {
    name: v.string(),
    newMarks: v.array(v.number()),
  },
  handler: async (ctx, args) => {
    // Find the student by userId
    const student = await ctx.db
      .query("students")
      .filter((q) => q.eq(q.field("name"), args.name))
      .first();

    if (!student) {
      throw new Error("Student not found");
    }

    // Update the numbers array
    await ctx.db.patch(student._id, {
      marks: args.newMarks,
    });
  },
});

export const getStudents = query({
  args: {},
  handler: async (ctx) => {
    const students = await ctx.db.query("students").collect();
    return students.map(student => ({ id: student._id, name: student.name, marks: student.marks || [] }));
  },
});



// // convex/students.ts
// import { mutation } from "./_generated/server";
// import { v } from "convex/values";

// export const addStudent = mutation({
//   args: { 
//     name: v.string(),
//   },
//   handler: async (ctx, args) => {
//     await ctx.db.insert("students", {
//       name: args.name,
//       createdAt: Date.now(),
//     });
//   },
// });

// export const getStudents = query({
//   args: {},
//   handler: async (ctx) => {
//     const students = await ctx.db.query("students").collect();
//     return students.map(student => ({ id: student._id, name: student.name }));
//   },
// });

// convex/students.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Mutation to add a student
export const addStudent = mutation({
  args: { 
    name: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("students", {
      name: args.name,
      createdAt: Date.now(),
    });
  },
});

// Query to get all student names
export const getStudents = query({
  args: {},
  handler: async (ctx) => {
    const students = await ctx.db.query("students").collect();
    return students.map(student => ({ id: student._id, name: student.name }));
  },
});

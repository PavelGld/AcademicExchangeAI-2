/**
 * Database Storage Interface
 * 
 * Provides type-safe database operations using Drizzle ORM
 * All CRUD operations for the university exchange platform
 * 
 * Features:
 * - PostgreSQL with Neon serverless
 * - Type-safe queries and mutations
 * - Comprehensive data models
 * - Optimized for performance
 */

import { 
  students, 
  universities, 
  exchangePrograms, 
  courses, 
  studentCourses, 
  achievements, 
  applications, 
  reviews, 
  recommendations,
  type Student, 
  type InsertStudent,
  type University,
  type InsertUniversity,
  type ExchangeProgram,
  type InsertExchangeProgram,
  type Course,
  type InsertCourse,
  type StudentCourse,
  type InsertStudentCourse,
  type Achievement,
  type InsertAchievement,
  type Application,
  type InsertApplication,
  type Review,
  type InsertReview,
  type Recommendation
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, sql, like } from "drizzle-orm";

export interface IStorage {
  // Students
  getStudent(id: number): Promise<Student | undefined>;
  getStudentByEmail(email: string): Promise<Student | undefined>;
  createStudent(student: InsertStudent): Promise<Student>;
  updateStudent(id: number, student: Partial<InsertStudent>): Promise<Student>;
  
  // Universities
  getUniversities(): Promise<University[]>;
  getUniversity(id: number): Promise<University | undefined>;
  createUniversity(university: InsertUniversity): Promise<University>;
  
  // Exchange Programs
  getExchangePrograms(filters?: {
    city?: string;
    language?: string;
    duration?: string;
    universityId?: number;
  }): Promise<(ExchangeProgram & { university: University })[]>;
  getExchangeProgram(id: number): Promise<(ExchangeProgram & { university: University }) | undefined>;
  createExchangeProgram(program: InsertExchangeProgram): Promise<ExchangeProgram>;
  
  // Courses
  getCoursesByProgram(programId: number): Promise<Course[]>;
  createCourse(course: InsertCourse): Promise<Course>;
  
  // Student Courses
  getStudentCourses(studentId: number): Promise<StudentCourse[]>;
  createStudentCourse(course: InsertStudentCourse): Promise<StudentCourse>;
  deleteStudentCourse(id: number): Promise<void>;
  
  // Achievements
  getStudentAchievements(studentId: number): Promise<Achievement[]>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;
  deleteAchievement(id: number): Promise<void>;
  
  // Applications
  getStudentApplications(studentId: number): Promise<(Application & { program: ExchangeProgram & { university: University } })[]>;
  createApplication(application: InsertApplication): Promise<Application>;
  updateApplicationStatus(id: number, status: string, reviewNotes?: string): Promise<Application>;
  
  // Reviews
  getProgramReviews(programId: number): Promise<(Review & { student: Student })[]>;
  createReview(review: InsertReview): Promise<Review>;
  
  // Recommendations
  getStudentRecommendations(studentId: number): Promise<(Recommendation & { course: Course; program: ExchangeProgram & { university: University } })[]>;
  createRecommendation(recommendation: Omit<Recommendation, 'id' | 'createdAt'>): Promise<Recommendation>;
}

export class DatabaseStorage implements IStorage {
  // Students
  async getStudent(id: number): Promise<Student | undefined> {
    const [student] = await db.select().from(students).where(eq(students.id, id));
    return student;
  }

  async getStudentByEmail(email: string): Promise<Student | undefined> {
    const [student] = await db.select().from(students).where(eq(students.email, email));
    return student;
  }

  async createStudent(student: InsertStudent): Promise<Student> {
    const [newStudent] = await db.insert(students).values(student).returning();
    return newStudent;
  }

  async updateStudent(id: number, student: Partial<InsertStudent>): Promise<Student> {
    const [updatedStudent] = await db
      .update(students)
      .set({ ...student, updatedAt: new Date() })
      .where(eq(students.id, id))
      .returning();
    return updatedStudent;
  }

  // Universities
  async getUniversities(): Promise<University[]> {
    return await db.select().from(universities).orderBy(universities.name);
  }

  async getUniversity(id: number): Promise<University | undefined> {
    const [university] = await db.select().from(universities).where(eq(universities.id, id));
    return university;
  }

  async createUniversity(university: InsertUniversity): Promise<University> {
    const [newUniversity] = await db.insert(universities).values(university).returning();
    return newUniversity;
  }

  // Exchange Programs
  async getExchangePrograms(filters?: {
    city?: string;
    language?: string;
    duration?: string;
    universityId?: number;
  }): Promise<(ExchangeProgram & { university: University })[]> {
    let query = db
      .select()
      .from(exchangePrograms)
      .innerJoin(universities, eq(exchangePrograms.universityId, universities.id))
      .where(eq(exchangePrograms.isActive, true));

    if (filters?.city) {
      query = query.where(eq(universities.city, filters.city));
    }
    if (filters?.language) {
      query = query.where(eq(exchangePrograms.language, filters.language));
    }
    if (filters?.duration) {
      query = query.where(eq(exchangePrograms.duration, filters.duration));
    }
    if (filters?.universityId) {
      query = query.where(eq(exchangePrograms.universityId, filters.universityId));
    }

    const results = await query;
    return results.map(result => ({
      ...result.exchange_programs,
      university: result.universities
    }));
  }

  async getExchangeProgram(id: number): Promise<(ExchangeProgram & { university: University }) | undefined> {
    const [result] = await db
      .select()
      .from(exchangePrograms)
      .innerJoin(universities, eq(exchangePrograms.universityId, universities.id))
      .where(eq(exchangePrograms.id, id));

    if (!result) return undefined;

    return {
      ...result.exchange_programs,
      university: result.universities
    };
  }

  async createExchangeProgram(program: InsertExchangeProgram): Promise<ExchangeProgram> {
    const [newProgram] = await db.insert(exchangePrograms).values(program).returning();
    return newProgram;
  }

  // Courses
  async getCoursesByProgram(programId: number): Promise<Course[]> {
    return await db.select().from(courses).where(eq(courses.programId, programId));
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    const [newCourse] = await db.insert(courses).values(course).returning();
    return newCourse;
  }

  // Student Courses
  async getStudentCourses(studentId: number): Promise<StudentCourse[]> {
    return await db
      .select()
      .from(studentCourses)
      .where(eq(studentCourses.studentId, studentId))
      .orderBy(desc(studentCourses.year), studentCourses.semester);
  }

  async createStudentCourse(course: InsertStudentCourse): Promise<StudentCourse> {
    const [newCourse] = await db.insert(studentCourses).values(course).returning();
    return newCourse;
  }

  async deleteStudentCourse(id: number): Promise<void> {
    await db.delete(studentCourses).where(eq(studentCourses.id, id));
  }

  // Achievements
  async getStudentAchievements(studentId: number): Promise<Achievement[]> {
    return await db
      .select()
      .from(achievements)
      .where(eq(achievements.studentId, studentId))
      .orderBy(desc(achievements.year));
  }

  async createAchievement(achievement: InsertAchievement): Promise<Achievement> {
    const [newAchievement] = await db.insert(achievements).values(achievement).returning();
    return newAchievement;
  }

  async deleteAchievement(id: number): Promise<void> {
    await db.delete(achievements).where(eq(achievements.id, id));
  }

  // Applications
  async getStudentApplications(studentId: number): Promise<(Application & { program: ExchangeProgram & { university: University } })[]> {
    const results = await db
      .select()
      .from(applications)
      .innerJoin(exchangePrograms, eq(applications.programId, exchangePrograms.id))
      .innerJoin(universities, eq(exchangePrograms.universityId, universities.id))
      .where(eq(applications.studentId, studentId))
      .orderBy(desc(applications.applicationDate));

    return results.map(result => ({
      ...result.applications,
      program: {
        ...result.exchange_programs,
        university: result.universities
      }
    }));
  }

  async createApplication(application: InsertApplication): Promise<Application> {
    const [newApplication] = await db.insert(applications).values(application).returning();
    return newApplication;
  }

  async updateApplicationStatus(id: number, status: string, reviewNotes?: string): Promise<Application> {
    const [updatedApplication] = await db
      .update(applications)
      .set({ 
        status, 
        reviewNotes, 
        reviewDate: new Date() 
      })
      .where(eq(applications.id, id))
      .returning();
    return updatedApplication;
  }

  // Reviews
  async getProgramReviews(programId: number): Promise<(Review & { student: Student })[]> {
    const results = await db
      .select()
      .from(reviews)
      .innerJoin(students, eq(reviews.studentId, students.id))
      .where(eq(reviews.programId, programId))
      .orderBy(desc(reviews.createdAt));

    return results.map(result => ({
      ...result.reviews,
      student: result.students
    }));
  }

  async createReview(review: InsertReview): Promise<Review> {
    const [newReview] = await db.insert(reviews).values(review).returning();
    return newReview;
  }

  // Recommendations
  async getStudentRecommendations(studentId: number): Promise<(Recommendation & { course: Course; program: ExchangeProgram & { university: University } })[]> {
    const results = await db
      .select()
      .from(recommendations)
      .innerJoin(courses, eq(recommendations.courseId, courses.id))
      .innerJoin(exchangePrograms, eq(recommendations.programId, exchangePrograms.id))
      .innerJoin(universities, eq(exchangePrograms.universityId, universities.id))
      .where(eq(recommendations.studentId, studentId))
      .orderBy(desc(recommendations.score));

    return results.map(result => ({
      ...result.recommendations,
      course: result.courses,
      program: {
        ...result.exchange_programs,
        university: result.universities
      }
    }));
  }

  async createRecommendation(recommendation: Omit<Recommendation, 'id' | 'createdAt'>): Promise<Recommendation> {
    const [newRecommendation] = await db.insert(recommendations).values(recommendation).returning();
    return newRecommendation;
  }
}

export const storage = new DatabaseStorage();

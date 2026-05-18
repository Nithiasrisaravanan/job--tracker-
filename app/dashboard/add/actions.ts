"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export async function addJob(formData: FormData) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  await db.job.create({
    data: {
      userId: session.user.id!,
      company: formData.get("company") as string,
      role: formData.get("role") as string,
      location: formData.get("location") as string,
      url: formData.get("url") as string,
      salary: formData.get("salary") as string,
      notes: formData.get("notes") as string,
      status: (formData.get("status") as any) || "WISHLIST",
    },
  });

  redirect("/dashboard");
}
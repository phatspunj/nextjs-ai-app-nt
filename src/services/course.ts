export type Course = {
  id: number;
  title: string;
  detail: string;
  picture: string;
}

export async function getCourses(): Promise<Course[]> {
  const response = await fetch('https://api.codingthailand.com/api/course');
  if (!response.ok) {
    throw new Error(`Failed to fetch courses: ${response.status}`);
  }
  const json = await response.json();
  return json.data as Course[];
}

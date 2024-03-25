import PocketBase from 'pocketbase';

export const pb = new PocketBase(
  import.meta.env.POCKETBASE_URL || process.env.POCKETBASE_URL
);
export async function getProjects() {
  const projects = await pb.collection('projects').getFullList();

  return projects;
}

export async function addProject(name: string) {
  const newProject = await pb.collection('projects').create({
    name,
    status: 'not started',
  });

  return newProject;
}

export async function getProject(id: string) {
  const project = await pb.collection('projects').getOne(id);

  return project;
}

export async function addTask(project_id: string, text: string) {
  const newTask = await pb.collection('tasks').create({
    project: project_id,
    text,
  });

  return newTask;
}

export async function getTasks(project_id: string) {
  const options = {
    filter: `project = "${project_id}"`,
  };

  const tasks = await pb.collection('tasks').getFullList(options);

  return tasks;
}

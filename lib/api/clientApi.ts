import axios from 'axios'
import { Note, NoteTag } from '@/types/note';
import { User } from '@/types/user';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface FetchNotesRequest {
  searchText?: string,
  page: number,
  tag?: string,
}

export interface FetchNotesResponse {
  notes: Note[],
  totalPages: number,
}

export interface CreateNoteProps {
  title: string,
  content: string,
  tag: NoteTag,
}

export interface RegisterProps {
  username: string,
  email: string,
  password: string,
}

const NextServerApi = axios.create({
  baseURL: API_URL + '/api',
  withCredentials: true,
});

export async function fetchNotes({ searchText, page, tag }: FetchNotesRequest): Promise<FetchNotesResponse> {
  const response = await NextServerApi.get<FetchNotesResponse>("/notes", {
    params: {
      ...(searchText !== "" && { search: searchText }),
      page,
      perPage: 12,
      tag,
    },
  });

  console.log(response.data);

  return response.data;
};

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await NextServerApi.get<Note>(`/notes/${id}`);

  return response.data;
}

export async function createNote(data: CreateNoteProps): Promise<Note> {
  const response = await NextServerApi.post<Note>(`/notes`, data);

  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await NextServerApi.delete<Note>(`/notes/${id}`)

  console.log(response.data)

  return response.data
}

export async function register(data: RegisterProps) {
  const res = await NextServerApi.post<User>('/auth/register', data);

  return res.data;
}

export interface LoginProps {
  email: string,
  password: string,
}

export async function login(data: LoginProps) {
  const res = await NextServerApi.post('/auth/login', data);

  return res.data;
}

export async function logout() {
  const res = await NextServerApi.post('/auth/logout');

  return res.data;
}

// export interface checkSessionProps {

// }

export async function checkSession() {
  const res = await NextServerApi.get('/auth/session');

  return res.data;
}






import axios from "axios";
import { notFound } from "next/navigation";

async function Getmethod(userId: string) {
    try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${userId}`);
        return res.data;
    } catch (error) {
        return null;
    }
    }

    export default async function UserPage({ params }: { params: { userId: string } }) {
    const { userId } = await params;
    const user = await Getmethod(userId);

    if (!user) {
        notFound(); // 404 페이지로 이동
    }

    return (
        <div>
        <h1>{user.title}</h1>
        <p>{user.body}</p>
        </div>
    );
}

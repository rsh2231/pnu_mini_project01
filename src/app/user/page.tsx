import axios from "axios";

export default async function Users() {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
    const users = res.data;
    return (
        <div>
            <h1>
                {
                    users.map((user:{id:string; title: string})=>(
                        <li key={user.id}>{user.id}
                            <h3>{user.title}</h3>
                        </li>
                    ))
                }
            </h1>
        </div>
    );
}

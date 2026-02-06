import {loginAction} from "@/actions/loginAction";

export default function Page() {
    return <div
        className="min-h-screen flex items-center justify-center bg-gray-100">
        <form action={loginAction}>
            <h1
                className="text-2xl font-bold mb-6 text-center"
            >Login Page</h1>
            <div
            >
                <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="username">Username:</label>
                <input
                    className="mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    id="username"
                    name="username"
                    required
                />
            </div>
            <div className="mt-4">
                <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="password">Password:</label>
                <input
                    className="mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="password"
                    id="password"
                    name="password"
                    required
                />
            </div>
            <button type="submit"
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >Login</button>
        </form>
    </div>;
}
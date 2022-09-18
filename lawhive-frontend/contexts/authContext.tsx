import { useRouter } from "next/router"
import { createContext, useContext, useEffect, useState } from "react"

const UserContext = createContext({
	userToken: "",
	setUserToken: (token: string) => {},
	signin: (token: string, userId: string) => {},
	signout: () => {},
})

export function useAuth() {
	return useContext(UserContext)
}

interface AuthProps {
	children: React.ReactNode
}

export default function AuthContextProvider({ children }: AuthProps) {
	const [userToken, setUserToken] = useState<string>("")
	const [loading, setLoading] = useState(true)
	const router = useRouter()

	useEffect(() => {
		if (localStorage.getItem("token"))
			setUserToken(localStorage.getItem("token") || "")
		setLoading(false)
	}, [])

	function signin(token: string, userId: string): void {
		localStorage.setItem("token", token)
		localStorage.setItem("userId", userId)
		setUserToken(token)
	}

	function signout(): void {
		setUserToken("")
		localStorage.removeItem("token")
		localStorage.removeItem("userId")
		router.push("/")
	}

	return (
		<UserContext.Provider value={{ userToken, setUserToken, signin, signout }}>
			{!loading && children}
		</UserContext.Provider>
	)
}

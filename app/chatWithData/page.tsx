import ChatWithData from '../components/chatWithData'
import NavBar from '../components/navBar'

export default function ChatWithDataPage() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <NavBar />
            <div className="flex-grow flex flex-col justify-end">
                <div className="w-full max-w-4xl mx-auto flex flex-col justify-end overflow-hidden">
                    <ChatWithData/>
                </div>
            </div>
        </div>
    )
}
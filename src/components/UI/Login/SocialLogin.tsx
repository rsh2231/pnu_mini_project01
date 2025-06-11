import axios from "axios";
import Image from "next/image";

export default function SocialLogin() {
    const size = 40;

    // 로그인 프로세스 oauth2
    const handleClick = async (provider: string) => {
        try {
            const res = await axios.post(
                "/api/login/oauth2",
                { provider, returnTo: window.location.origin },
                { withCredentials: true }
            );
            if (res.data && res.data.redirectUrl) {
                window.location.href = res.data.redirectUrl;
            }
        } catch (error) {
            console.error("OAuth 로그인 실패:", error);
        }
    };

    const providers = [
        { name: "google", icon: "/icons/icons8-google64.png" },
        { name: "naver", icon: "/icons/icons8-naver.png" },
        { name: "github", icon: "/icons/icons8-github64.png" },
        { name: "kakaotalk", icon: "/icons/icons8-kakaotalk-48.png" },
    ];

    return (
        <div className="flex gap-4 justify-center mt-2">
            {providers.map(({ name, icon }) => (
                <button
                    key={name}
                    onClick={() => handleClick(name)}
                    aria-label={`${name} 로그인`}
                    className="w-[40px] h-[40px] flex items-center justify-center rounded-md border border-gray-300 shadow-sm hover:brightness-110 transition"
                    type="button"
                >
                    <Image src={icon} alt={`${name} 아이콘`} width={size} height={size} />
                </button>
            ))}
        </div>
    );
}

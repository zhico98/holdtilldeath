"use client"

import { useState } from "react"
import { X, Send } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  const [isDeadChatOpen, setIsDeadChatOpen] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [selectedGhost, setSelectedGhost] = useState<string | null>(null)
  const [ghostChats, setGhostChats] = useState<{
    [key: string]: Array<{ id: string; sender: "user" | "ghost"; text: string; ghostName?: string }>
  }>({})
  const [inputMessage, setInputMessage] = useState("")

  const ghosts = [
    {
      id: "dead_soul",
      name: "Dead Soul",
      description: "A spirit who died HODLing to the end",
      personality: "Speaks about the final moments, regrets, and crypto death",
      image: "/images/ghosts/ghost-base.png",
    },
    {
      id: "sad_spirit",
      name: "Sad Spirit",
      description: "A melancholic ghost who lost everything",
      personality: "Always worried about losses, gives cautious advice",
      image: "/images/ghosts/ghost-base.png",
    },
    {
      id: "happy_phantom",
      name: "Happy Phantom",
      description: "An optimistic ghost who died rich",
      personality: "Cheerful about crypto gains, motivational speaker from beyond",
      image: "/images/ghosts/ghost-base.png",
    },
    {
      id: "crying_wraith",
      name: "Crying Wraith",
      description: "A ghost who weeps for the living's mistakes",
      personality: "Emotional, warns about crypto dangers through tears",
      image: "/images/ghosts/ghost-base.png",
    },
    {
      id: "cute_specter",
      name: "Cute Specter",
      description: "An adorable ghost who loves helping newcomers",
      personality: "Sweet and helpful, explains crypto basics cutely",
      image: "/images/ghosts/ghost-base.png",
    },
    {
      id: "sleepy_shade",
      name: "Sleepy Shade",
      description: "A tired ghost who died from staying up watching charts",
      personality: "Drowsy, talks about the importance of rest and patience",
      image: "/images/ghosts/ghost-base.png",
    },
    {
      id: "love_ghost",
      name: "Love Ghost",
      description: "A romantic spirit in love with HOLDTILLDEATH",
      personality: "Passionate about the token, speaks with love and devotion",
      image: "/images/ghosts/ghost-base.png",
    },
    {
      id: "shocked_soul",
      name: "Shocked Soul",
      description: "A ghost still surprised by their sudden death",
      personality: "Always amazed, gives shocking crypto revelations",
      image: "/images/ghosts/ghost-base.png",
    },
  ]

  const ghostResponses = {
    dead_soul: [
      "I held until my last breath... and beyond... X_X",
      "Death came for me, but I never sold... worth it...",
      "The charts stopped moving for me, but HOLD lives on...",
      "From the grave I tell you... HODL is eternal...",
      "Even in death, my diamond hands remain unbroken...",
      "The final candle closed... but my spirit HODLs forever...",
    ],
    sad_spirit: [
      "I worry you'll make the same mistakes I did... *sigh*",
      "The market is so cruel... be careful, living one...",
      "I lost everything... don't let it happen to you...",
      "My portfolio died before I did... learn from my sorrow...",
      "The bears took everything from me... *weeps*",
      "If only I had listened to the warnings...",
    ],
    happy_phantom: [
      "I died rich and happy! HOLDTILLDEATH made me wealthy! ^_^",
      "Even in death, I'm smiling! This token is amazing!",
      "Cheer up! The afterlife is great when you HODL right!",
      "I'm the happiest ghost in the graveyard thanks to HOLD!",
      "Death couldn't stop my gains! Still pumping in the afterlife!",
      "Every day is a good day when you HODL the right token!",
    ],
    crying_wraith: [
      "I weep for those who sell too early... *sob*",
      "My tears are for the paper hands... don't be like them...",
      "The pain of watching others lose... it breaks my ghostly heart...",
      "I cry because I care... please be wise with your coins...",
      "*sobbing* Why do they always panic sell?",
      "These tears have been flowing since the last bear market...",
    ],
    cute_specter: [
      "Aww, you're so brave to talk to us! (◕‿◕)",
      "Let me help you understand crypto, cutie!",
      "You're doing great! Keep learning about HOLDTILLDEATH!",
      "Ghosts can be friendly too! We just want to help! ♡",
      "Don't be scared! I'm here to guide you through crypto!",
      "You're such a sweet little investor! Keep it up!",
    ],
    sleepy_shade: [
      "Zzz... oh, you woke me... I was dreaming of green candles...",
      "So tired from watching charts all night... *yawn*",
      "Sleep is important... I forgot that when I was alive...",
      "The market never sleeps... but you should... zzz...",
      "*yawning* Five more minutes... just checking the charts...",
      "I died from exhaustion... don't make my mistake...",
    ],
    love_ghost: [
      "I LOVE HOLDTILLDEATH with all my ghostly heart! ♥♥♥",
      "This token is my eternal love! Even death can't part us!",
      "My heart beats for HOLD... well, it would if I had one!",
      "Love transcends death, just like this amazing token!",
      "Every pump makes my ghostly heart flutter! ♥",
      "True love never dies... just like HOLDTILLDEATH!",
    ],
    shocked_soul: [
      "I can't believe I'm dead! The pump was so sudden! O_O",
      "WHAT?! You can actually talk to us?! This is incredible!",
      "I'm still shocked by how fast everything happened!",
      "The afterlife has WiFi?! This is mind-blowing!",
      "WAIT! Did HOLDTILLDEATH just hit a new ATH?!",
      "I'm SHOOK! This is beyond my wildest dreams!",
    ],
  }

  const getCurrentMessages = () => {
    return selectedGhost ? ghostChats[selectedGhost] || [] : []
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !selectedGhost) return

    const newUserMessage = {
      id: Date.now().toString(),
      sender: "user" as const,
      text: inputMessage,
    }

    setGhostChats((prev) => ({
      ...prev,
      [selectedGhost]: [...(prev[selectedGhost] || []), newUserMessage],
    }))

    // Ghost response after a delay
    setTimeout(
      () => {
        const ghostResponseList = ghostResponses[selectedGhost as keyof typeof ghostResponses]
        const randomResponse = ghostResponseList[Math.floor(Math.random() * ghostResponseList.length)]

        const ghostMessage = {
          id: (Date.now() + 1).toString(),
          sender: "ghost" as const,
          text: randomResponse,
          ghostName: ghosts.find((g) => g.id === selectedGhost)?.name,
        }

        setGhostChats((prev) => ({
          ...prev,
          [selectedGhost]: [...(prev[selectedGhost] || []), ghostMessage],
        }))
      },
      1000 + Math.random() * 2000,
    )

    setInputMessage("")
  }

  const selectGhost = (ghostId: string) => {
    setSelectedGhost(ghostId)

    // Initialize chat for this ghost if it doesn't exist
    if (!ghostChats[ghostId]) {
      setTimeout(() => {
        const ghost = ghosts.find((g) => g.id === ghostId)
        const welcomeMessage = {
          id: Date.now().toString(),
          sender: "ghost" as const,
          text: `*A ghostly figure materializes...* Hello, living one... I am ${ghost?.name}...`,
          ghostName: ghost?.name,
        }

        setGhostChats((prev) => ({
          ...prev,
          [ghostId]: [welcomeMessage],
        }))
      }, 500)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/graveyard-bg.gif')",
          filter: "grayscale(100%) contrast(1.3) brightness(0.7)",
        }}
      />

      {/* Light overlay for vintage film look */}
      <div className="absolute inset-0 bg-black/15" />

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6">
          <nav className="flex justify-between items-center">
            <div className="text-lg font-bold text-white">HOLDTILLDEATH</div>
            <div
              className="text-sm font-semibold text-white transition-all duration-300"
              style={{
                animation: "tokenGlow 2s infinite alternate",
                textShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
              }}
            >
              $HOLD
            </div>
          </nav>

          {/* DEADCHAT Button - Top Center */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsDeadChatOpen(true)}
              className="inline-block border-2 border-white bg-transparent hover:bg-black/20 px-6 py-3 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.8)] transform hover:scale-105"
              style={{
                animation: "ghostFlicker 2s infinite alternate",
              }}
            >
              <span className="text-white text-sm tracking-wider">[ DEADCHAT ]</span>
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            {/* Hero Section - Ready for content */}
            <div className="space-y-6">
              {/* Title area - ready for main heading */}
              <div className="h-20"></div>

              {/* Subtitle area - ready for description */}
              <div className="h-12"></div>

              {/* CTA buttons area */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="h-12 w-40 mx-auto sm:mx-0"></div>
                <div className="h-12 w-40 mx-auto sm:mx-0"></div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-6 text-center">
          <div className="flex justify-center items-center gap-8">
            {/* Social Links with brackets */}
            <a
              href="https://x.com/HoldTillDeath"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-purple-300 transition-colors duration-300 text-sm tracking-wider"
            >
              [ TWITTER ]
            </a>
            <a
              href="https://t.me/HOLDTILLDEATHFUN"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-pink-300 transition-colors duration-300 text-sm tracking-wider"
            >
              [ TELEGRAM ]
            </a>
            <button
              onClick={() => setIsAboutOpen(true)}
              className="text-white hover:text-green-300 transition-colors duration-300 text-sm tracking-wider"
            >
              [ ABOUT ]
            </button>
          </div>
        </footer>
      </div>

      {/* ABOUT Modal */}
      {isAboutOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black border-2 border-white w-full max-w-4xl max-h-[80vh] overflow-y-auto relative">
            {/* Header */}
            <div className="border-b-2 border-white p-6 flex justify-between items-center">
              <h2 className="text-white text-xl">[ ABOUT HOLDTILLDEATH ]</h2>
              <button onClick={() => setIsAboutOpen(false)} className="text-white hover:text-red-400 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              {/* Main Description */}
              <div className="text-center space-y-6">
                <div className="space-y-4 text-gray-200 leading-relaxed">
                  <p className="text-lg">
                    <span className="text-white font-bold">$HOLDTILLDEATH</span> is not a meme token.
                  </p>
                  <p className="text-lg">It's a tombstone written in code.</p>
                </div>

                <div className="border-t border-gray-600 pt-6 space-y-4 text-gray-300">
                  <p>Forged by those who refused to sell — even when they should have.</p>
                  <p>This is a graveyard of gains, a temple of pain.</p>
                  <p>We don't chase pumps. We haunt them.</p>
                </div>

                <div className="border-t border-gray-600 pt-6 space-y-4 text-gray-400">
                  <p>No roadmap. No exit. No heartbeat.</p>
                  <p>Just a contract… and the silence of unsold bags.</p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-600"></div>

              {/* Additional Sections */}
              <div className="space-y-8">
                {/* The Manifesto */}
                <div className="space-y-4 text-center">
                  <h3 className="text-white text-lg border-b border-gray-600 pb-2 mx-auto inline-block">
                    [ THE MANIFESTO ]
                  </h3>
                  <div className="text-gray-300 text-sm space-y-3 leading-relaxed max-w-2xl mx-auto">
                    <p>We are the ghosts of bull markets past.</p>
                    <p>The spirits of those who held through crashes, corrections, and capitulation.</p>
                    <p>Our bags became our graves. Our diamond hands, our tombstones.</p>
                    <p>In death, we found immortality. In loss, we discovered truth.</p>
                  </div>
                </div>

                {/* Two Column Grid for Contract and Community */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* The Contract */}
                  <div className="space-y-4">
                    <h3 className="text-white text-lg border-b border-gray-600 pb-2">[ THE CONTRACT ]</h3>
                    <div className="text-gray-300 text-sm space-y-3 leading-relaxed">
                      <p>No utility beyond the grave.</p>
                      <p>No promises of moon missions.</p>
                      <p>No false hope of resurrection.</p>
                      <p>Only the eternal commitment to never sell.</p>
                    </div>
                  </div>

                  {/* The Community */}
                  <div className="space-y-4">
                    <h3 className="text-white text-lg border-b border-gray-600 pb-2">[ THE COMMUNITY ]</h3>
                    <div className="text-gray-300 text-sm space-y-3 leading-relaxed">
                      <p>We are the holders who never fold.</p>
                      <p>The believers who transcended belief.</p>
                      <p>United in death, divided by nothing.</p>
                      <p>Speak with us through DEADCHAT.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Final Message */}
              <div className="border-t border-gray-600 pt-6 text-center">
                <p className="text-gray-400 italic">"In the end, we all become what we hold."</p>
                <p className="text-gray-500 text-sm mt-2">- The Eternal Holders</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DEADCHAT Modal */}
      {isDeadChatOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black border-2 border-white w-full max-w-6xl h-[80vh] flex flex-col relative">
            {/* Header */}
            <div className="border-b-2 border-white p-4 flex justify-between items-center">
              <h2 className="text-white text-lg">
                {selectedGhost
                  ? `[ DEADCHAT - ${ghosts.find((g) => g.id === selectedGhost)?.name.toUpperCase()} ]`
                  : "[ DEADCHAT - SPEAK WITH THE DEAD ]"}
              </h2>
              <button
                onClick={() => {
                  setIsDeadChatOpen(false)
                  setSelectedGhost(null)
                }}
                className="text-white hover:text-red-400 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-1 overflow-hidden">
              {/* Ghost Selection Sidebar */}
              {!selectedGhost && (
                <div className="w-full p-6 flex flex-col items-center justify-center">
                  <h3 className="text-white text-xl mb-8 text-center">Choose a spirit to commune with...</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
                    {ghosts.map((ghost) => (
                      <button
                        key={ghost.id}
                        onClick={() => selectGhost(ghost.id)}
                        className="border-2 border-gray-500 hover:border-white bg-gray-900/50 hover:bg-gray-800/70 p-4 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] group flex flex-col items-center relative"
                      >
                        {/* Chat indicator */}
                        {ghostChats[ghost.id] && ghostChats[ghost.id].length > 0 && (
                          <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
                        )}

                        <div className="mb-3 group-hover:animate-pulse">
                          <Image
                            src={ghost.image || "/placeholder.svg"}
                            alt={ghost.name}
                            width={64}
                            height={64}
                            className="pixelated"
                          />
                        </div>
                        <h4 className="text-white text-sm mb-2">{ghost.name}</h4>
                        <p className="text-gray-400 text-xs text-center">{ghost.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Individual Chat Interface */}
              {selectedGhost && (
                <>
                  {/* Chat Messages */}
                  <div className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-4">
                      {getCurrentMessages().map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 border-2 ${
                              message.sender === "user"
                                ? "bg-purple-900/50 border-purple-500 text-white"
                                : "bg-gray-900/70 border-gray-500 text-gray-200"
                            }`}
                          >
                            {message.sender === "ghost" && (
                              <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                                <Image
                                  src={ghosts.find((g) => g.id === selectedGhost)?.image || ""}
                                  alt="ghost"
                                  width={20}
                                  height={20}
                                  className="pixelated"
                                />
                                {message.ghostName}
                              </div>
                            )}
                            <p className="text-sm">{message.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chat Input */}
                  <div className="border-t-2 border-white p-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        placeholder={`Speak to ${ghosts.find((g) => g.id === selectedGhost)?.name}...`}
                        className="flex-1 bg-black border-2 border-gray-500 text-white px-4 py-2 focus:border-white focus:outline-none text-sm"
                      />
                      <button
                        onClick={handleSendMessage}
                        className="border-2 border-white bg-transparent hover:bg-white hover:text-black px-4 py-2 transition-colors text-white"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => setSelectedGhost(null)}
                      className="mt-2 text-gray-400 hover:text-white text-xs transition-colors"
                    >
                      ← Back to spirit selection
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes ghostFlicker {
          0% {
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
            border-color: rgba(255, 255, 255, 0.6);
          }
          25% {
            box-shadow: 0 0 25px rgba(255, 255, 255, 0.8);
            border-color: rgba(255, 255, 255, 0.9);
          }
          50% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
            border-color: rgba(255, 255, 255, 0.7);
          }
          75% {
            box-shadow: 0 0 30px rgba(255, 255, 255, 0.9);
            border-color: rgba(255, 255, 255, 1);
          }
          100% {
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
            border-color: rgba(255, 255, 255, 0.5);
          }
        }
        
        @keyframes tokenGlow {
          0% {
            text-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
          }
          25% {
            text-shadow: 0 0 15px rgba(255, 255, 255, 0.9);
          }
          50% {
            text-shadow: 0 0 12px rgba(255, 255, 255, 0.7);
          }
          75% {
            text-shadow: 0 0 18px rgba(255, 255, 255, 1);
          }
          100% {
            text-shadow: 0 0 6px rgba(255, 255, 255, 0.5);
          }
        }
        
        .pixelated {
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
        }
      `}</style>
    </div>
  )
}

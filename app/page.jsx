'use client';
import { assets } from "@/assets/assets";
import Message from "@/components/Message";
import PromptBox from "@/components/PromptBox";
import Sidebar from "@/components/Sidebar";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useThemeContext } from "@/context/ThemeContext";
import ThemeToggle from "@/components/ThemeToggle";
import { jsPDF } from "jspdf";

export default function Home() {

  const [expand, setExpand] = useState(false)
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const {selectedChat} = useAppContext()
  const { darkMode } = useThemeContext()
  const containerRef = useRef(null)

  const downloadCodeAsPDF = (content) => {
    const doc = new jsPDF();
    const lines = content.split('\n');
    let y = 10;
    
    // Add title
    doc.setFontSize(16);
    doc.text('Code Response', 10, y);
    y += 10;
    
    // Add content
    doc.setFontSize(12);
    doc.setFont('courier');
    lines.forEach(line => {
      if (y > 280) {
        doc.addPage();
        y = 10;
      }
      doc.text(line, 10, y);
      y += 7;
    });
    
    doc.save('code-response.pdf');
  };

  useEffect(()=>{
    if(selectedChat){
      setMessages(selectedChat.messages)
    }
  },[selectedChat])

  useEffect(()=>{
    if(containerRef.current){
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  },[messages])



  return (
    <div>
      <div className="flex h-screen">
        <Sidebar expand={expand} setExpand={setExpand}/>
        <div className={`flex-1 flex flex-col items-center justify-center px-4 pb-8 ${darkMode ? 'bg-[#292a2d] text-white' : 'bg-gray-50 text-gray-800'} relative`}>
          <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full">
            <Image onClick={()=> (expand ? setExpand(false) : setExpand(true))}
             className="rotate-180" src={assets.menu_icon} alt=""/>
            <Image className="opacity-70" src={assets.chat_icon} alt=""/>
          </div>

          <div className="absolute top-6 right-6">
            <ThemeToggle />
          </div>

          {messages.length === 0 ? (
            <>
            <div className="flex items-center gap-3">
              <Image src={assets.logo_icon} alt="" className="h-16"/>
              <p className="text-2xl font-medium">Hi, I'm DeepSeek.</p>
            </div>
            <p className="text-sm mt-2">How can I help you today?</p>
            </>
          ):
          (
          <div ref={containerRef}
          className="relative flex flex-col items-center justify-start w-full mt-20 max-h-screen overflow-y-auto"
          > 
          <p className="fixed top-8 border border-transparent hover:border-gray-500/50 py-1 px-2 rounded-lg font-semibold mb-6">{selectedChat.name}</p>
          {messages.map((msg, index)=>(
            <div key={index} className="w-full max-w-3xl">
              <Message role={msg.role} content={msg.content}/>
              {!isLoading && msg.role === 'assistant' && msg.content.includes('```') && (
                <button
                  onClick={() => downloadCodeAsPDF(msg.content)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  <Image src={assets.download_icon} alt="Download" className="w-4 h-4"/>
                  Download Code as PDF
                </button>
              )}
            </div>
          ))}
          {
            isLoading && (
              <div className="flex gap-4 max-w-3xl w-full py-3">
                <Image className="h-9 w-9 p-1 border border-white/15 rounded-full"
                 src={assets.logo_icon} alt="Logo"/>
                 <div className="loader flex justify-center items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                  <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                  <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                 </div>
              </div>
            )
          }
            
          </div>
        )
        }
        <PromptBox isLoading={isLoading} setIsLoading={setIsLoading}/>
        <p className="text-xs absolute bottom-1 text-gray-500">AI-generated, for reference only</p>

        </div>
      </div>
    </div>
  );
}

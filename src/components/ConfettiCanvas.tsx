import React, { forwardRef, useImperativeHandle, useRef } from 'react'

type ConfettiHandle = { burst: ()=>void }

export default forwardRef<ConfettiHandle, {}>(function ConfettiCanvas(_, ref){
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animRef = useRef<number | null>(null)
  const particlesRef = useRef<any[]>([])

  useImperativeHandle(ref, () => ({
    burst: () => {
      createBurst()
    }
  }))

  function createBurst(){
    const canvas = canvasRef.current
    if(!canvas) return
    const ctx = canvas.getContext('2d')!
    const cw = canvas.width = window.innerWidth
    const ch = canvas.height = Math.max(window.innerHeight * 0.6, 200)
    const colors = ['#06b6d4','#7c3aed','#f97316','#f43f5e','#10b981','#facc15']
    for(let i=0;i<120;i++){
      particlesRef.current.push({
        x: Math.random()*cw,
        y: -20,
        w: 6 + Math.random()*8,
        h: 6 + Math.random()*8,
        vx: (Math.random()-0.5)*6,
        vy: 2 + Math.random()*5,
        rot: Math.random()*360,
        vr: (Math.random()-0.5)*0.2,
        life: 60 + Math.random()*60,
        color: colors[Math.floor(Math.random()*colors.length)]
      })
    }
    if(animRef.current == null) runAnim()
  }

  function runAnim(){
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    function frame(){
      const cw = canvas.width = window.innerWidth
      const ch = canvas.height = Math.max(window.innerHeight * 0.6, 200)
      ctx.clearRect(0,0,cw,ch)
      const parts = particlesRef.current
      for(let i=parts.length-1;i>=0;i--){
        const p = parts[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.15
        p.rot += p.vr
        p.life -= 1
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h)
        ctx.restore()
        if(p.life <= 0 || p.y > ch + 50){
          parts.splice(i,1)
        }
      }
      if(parts.length > 0){
        animRef.current = requestAnimationFrame(frame)
      } else {
        animRef.current = null
        ctx.clearRect(0,0,canvas.width,canvas.height)
      }
    }
    animRef.current = requestAnimationFrame(frame)
  }

  return <canvas ref={canvasRef} className="pointer-events-none fixed top-0 left-0 w-full z-50" />
})

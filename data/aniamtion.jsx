import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger)

export const animateWithGsap = (target, animationProp, scrollProps) =>{
  gsap.to(target,{
    ...animationProp,
    scrollTrigger: {
      trigger: target,
      start: 'top 85%',
      ...scrollProps
    }
  })
}
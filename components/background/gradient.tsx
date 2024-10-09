import { CanvasWebgl } from "components/canvas/webgl"
import { useEffect, useRef, useState } from "react"

type TBackground = {}

export const WebglBackground = () => {
  const parentRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<{ width: number; height: number } | undefined>(undefined)
  useEffect(() => {
    function handleResize() {
      if (parentRef.current) {
        const { width, height } = parentRef.current.getBoundingClientRect()
        setSize({ width, height })
      }
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])
  useEffect(() => {
    if (parentRef.current) {
      const { width, height } = parentRef.current.getBoundingClientRect()
      setSize({ width, height })
    }
  }, [])
  return (
    <div ref={parentRef} className="absolute inset-0 m-auto h-screen w-full">
      {size && (
        <CanvasWebgl
          vsSrc={`
          #version 300 es
          in vec4 position;
          in vec2 texcoord;
          uniform mat4 u_matrix;
          uniform vec2 iResolution;
          out vec2 vTexcoord;
          void main() {
            vec4 screen = u_matrix * position;
            vec2 zeroToOne = screen.xy / iResolution;
            gl_Position = vec4(zeroToOne, 0, 1);
            vTexcoord = texcoord;
          }
          `}
          fsSrc={[
            `
            #version 300 es
            precision highp float;
            uniform vec2 iResolution;
            uniform vec4 iMouse;
            uniform float iTime;
            uniform sampler2D iChannel0;
            uniform sampler2D iChannel1;
            out vec4 fragColor;
            #define R iResolution
            #define CO gl_FragCoord 
            #define PI acos(-1.) // Define pi
            #define S(a,b,t) smoothstep(a,b,t)

mat2 Rot(float a)
{
    float s = sin(a);
    float c = cos(a);
    return mat2(c, -s, s, c);
}


// Created by inigo quilez - iq/2014
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
vec2 hash( vec2 p )
{
    p = vec2( dot(p,vec2(2127.1,81.17)), dot(p,vec2(1269.5,283.37)) );
	return fract(sin(p)*43758.5453);
}

float noise( in vec2 p )
{
    vec2 i = floor( p );
    vec2 f = fract( p );
	
	vec2 u = f*f*(3.0-2.0*f);

    float n = mix( mix( dot( -1.0+2.0*hash( i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ), 
                        dot( -1.0+2.0*hash( i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                   mix( dot( -1.0+2.0*hash( i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ), 
                        dot( -1.0+2.0*hash( i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
	return 0.5 + 0.5*n;
}


void main( )
{
    vec2 uv = CO.xy/R.xy;
    float ratio = R.x / R.y;

    vec2 tuv = uv;
    tuv -= .5;

    // rotate with Noise
    float degree = noise(vec2(iTime*.1, tuv.x*tuv.y));

    tuv.y *= 1./ratio;
    tuv *= Rot(radians((degree-.5)*720.+180.));
	tuv.y *= ratio;

    
    // Wave warp with sin
    float frequency = 5.;
    float amplitude = 30.;
    float speed = iTime * 2.;
    tuv.x += sin(tuv.y*frequency+speed)/amplitude;
   	tuv.y += sin(tuv.x*frequency*1.5+speed)/(amplitude*.5);
    
    
    // draw the image
    vec3 colorYellow = vec3(.957, .804, .623);
    vec3 colorDeepBlue = vec3(.192, .384, .933);
    vec3 layer1 = mix(colorYellow, colorDeepBlue, S(-.3, .2, (tuv*Rot(radians(-5.))).x));
    
    vec3 colorRed = vec3(.910, .510, .8);
    vec3 colorBlue = vec3(0.350, .71, .953);
    vec3 layer2 = mix(colorRed, colorBlue, S(-.3, .2, (tuv*Rot(radians(-5.))).x));
    
    vec3 finalComp = mix(layer1, layer2, S(.5, -.3, tuv.y));
    
    vec3 col = finalComp;
    
    fragColor = vec4(col,1.0);
}
            `,
          ]}
          size={size}
        />
      )}
    </div>
  )
}

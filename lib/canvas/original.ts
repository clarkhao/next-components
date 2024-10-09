export const createTextureWithGL = (gl: WebGLRenderingContext) => {
  // 创建纹理
  const texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)
  // 设置参数，让我们可以绘制任何尺寸的图像
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
  // 将图像上传到纹理
  //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  return texture
}

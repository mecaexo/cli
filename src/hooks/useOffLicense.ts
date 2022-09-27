import { Stowage } from "types"
import { host } from "utils"

type Type = 's3'

export default function useOffLicense(_type: Type) {
  return { url, key }
}

function key(stowage: Stowage) {
  let rv = stowage.pkg.project
  if (stowage.type == 'bottle') {
    const { platform, arch } = stowage.host ?? host()
    rv += `/${platform}/${arch}`
  }
  rv += `/v${stowage.pkg.version}`
  return rv
}

function url(stowage: Stowage) {
  switch (stowage.type) {
  case 'bottle':
    return new URL(`https://dist.tea.xyz/${key(stowage)}.tar.${stowage.compression}`)
  case 'src':
    return new URL(`https://dist.tea.xyz/${key(stowage)}${stowage.extname}`)
  }
}
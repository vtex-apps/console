export const getAppId = (envControllers: EnvController) => {
  const {
    appName,
    chosenMajor,
    chosenMinor,
    chosenPatch,
  } = envControllers
  return appName ?
    `${appName}@${chosenMajor}.${chosenMinor}.${chosenPatch}` :
    null
}

export const getAppVersion = (envControllers: EnvController) => {
  const {
    chosenMajor,
    chosenMinor,
    chosenPatch,
  } = envControllers
  return (chosenMajor && chosenMinor && chosenPatch) ?
    `${chosenMajor}.${chosenMinor}.${chosenPatch}` :
    null
}

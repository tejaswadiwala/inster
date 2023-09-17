import path from 'path'

export const getAbsolutePathFromRelativePath = (relativeFilePath: string) => {
  // Determine the root directory of your project (where your main script is located)
  const rootDirectory = process.cwd() // You can use process.cwd() for the current working directory.

  // Modify the root directory to exclude 'dist' if it's present
  const modifiedRootDirectory = rootDirectory.endsWith('dist')
    ? path.dirname(rootDirectory)
    : rootDirectory

  // Create the absolute file path by joining the modified root directory and relative path
  const absoluteFilePath = path.join(modifiedRootDirectory, relativeFilePath)
  return absoluteFilePath
}

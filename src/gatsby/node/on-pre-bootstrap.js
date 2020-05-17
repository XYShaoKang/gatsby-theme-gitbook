import path from 'path'
import fs from 'fs'

export const onPreBootstrap = (
  { reporter },
  options
) => {
  const contentPath =
    options.contentPath || `docs`
  const summaryPath = path.join(
    contentPath,
    `SUMMARY.md`
  )

  if (!fs.existsSync(contentPath)) {
    reporter.info(
      `creating the ${contentPath} directory`
    )
    fs.mkdirSync(contentPath)
  }

  if (!fs.existsSync(summaryPath)) {
    reporter.info(`creating the SUMMARY.md file`)
    fs.writeFileSync(
      summaryPath,
      `# 目录`,
      `utf8`
    )
  }
}

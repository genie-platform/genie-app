const util = require('util');
const exec = util.promisify(require('child_process').exec);

/**
 * A script for deploying the app
 *
 * The script builds the app, deploys to AWS S3 and then invalidates cloudfront
 *
 * We need to invalidate cloudfron so we could see the changes on the domain
 */
async function deploy() {
  const BUILD_CMD = 'yarn build';
  const DEPLOY_CMD = 'aws s3 sync build/ s3://the-genie-app --acl public-read';
  const INVALIDATE_CMD =
    'aws cloudfront create-invalidation --distribution-id EEGKEN4AB5LE1 --paths "/*"';

  console.log('Starting the build and deploy proccess...');

  // build app locally to the /build folder
  console.log('\nBuilding project...');
  const build = await exec(BUILD_CMD);
  console.log(`Build stdout: ${build.stdout}`);
  console.log(`Build stderr: ${build.stderr ? build.stderr : 'no errors'}`);

  // deploy app (the /build folder) to S3 bucket
  console.log('\nDeploying project...');
  const deploy = await exec(DEPLOY_CMD);
  console.log(`Deploy stdout: ${deploy.stdout}`);
  console.log(`Deploy stderr: ${deploy.stderr ? deploy.stderr : 'no errors'}`);

  // invalidate cloudfront so we can see updated app
  // otherwise the site will update after 24h (the cloudfron cache update)
  console.log('\nInvalidating on cloudfront...');
  const invalidate = await exec(INVALIDATE_CMD);
  console.log(`Invalidate stdout: ${invalidate.stdout}`);
  console.log(
    `Invalidate stderr: ${invalidate.stderr ? invalidate.stderr : 'no errors'}`
  );

  console.log('\nDone!');
}

deploy();

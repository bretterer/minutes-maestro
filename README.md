# Minutes Maestro

## How to deploy
This project is using Laravel as the PHP Framework, so you will need to make sure you have the following requirements:

### Requirements
- PHP Server
- Sqlite
- Node/Npm
- Redis
- Git
- Composer


### Deploying
1. From the root of your webserver, run `git clone https://github.com/bretterer/minutes-maestro.git`
2. Run `composer install`
3. Run `npm install`
4. Copy `.env.example` to `.env`
5. Run `php artisan key:generate`
6. Open `.env` and change `REVERB_HOST` to your domain name without the `http`
7. Run `npm run build`
8. Run `php artisan migrate`
9. Run `php artisan queue:work`
10. Run `php artisan reverb:tart`
11. Visit your domain


### CI/CD
If running your site with CI/CD, you will want to run the following on each deployment

```sh
composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

npm ci
npm run build

( flock -w 10 9 || exit 1
    echo 'Restarting FPM...'; sudo -S service php reload ) 9>/tmp/fpmlock  #Change `php` to your PHP FPM binary

if [ -f artisan ]; then
    php artisan migrate --force
fi


php artisan reverb:restart
```

# SaaS Boilerplate - Frontend Setup

### This set up assumes you already created and set up the Backend Service.

##### Make sure project folder has been created `saas-boilerplate` and you already created a `backend` folder inside of it.

1. Open up a new terminal shell along side your currently running Django server.
2. Go the root of the project folder i.e. `Desktop/saas-boilerplate` from step `backend` setup that you created by running `cd ~/Desktop/saas-boilerplate` or where ever you created your main project folder with `backend` inside.
   1. run `mkdir frontend`, `cd frontend` and `git clone https://github.com/rcmiskin10/dj_react_frontend_render_template.git .`
   2. make sure you have `npm` and run `npm install`.
   3. Now create a `.env` inside `frontend` root folder.
      1. Add the publishable key from Stripe to the environmental variable `REACT_APP_STRIPE_API_TEST_PK` with the value from `STRIPE_API_TEST_PK` in `backend/.env` in step 12.3.1.
      2. Now add an environmental variable `REACT_APP_GA_ID` for Google Analytics
         1. Go to https://analytics.google.com/
            1. Add an analytics account
            2. Add an app
            3. Go to top search bar and search for `MEASUREMENT ID` in `Data Streams` and copy the ID that has prefix `G-XXXXXXXX`
            4. Past that `G-XXXXXXXX` as value for environmental variable `REACT_APP_GA_ID` in `frontend/.env`
   4. Once complete run `npm run start`.
   5. Once up and running you should be able to go to http://localhost:3000/ where you should see all the data you added for landing page in django
3. Now everything in dev should be up and running.
4. Next we will deploy the `frontend/` app (static react app) to render.com.
   1. Create a repo on your github for the `frontend` folder
   2. Connect your github account here: https://dashboard.render.com/select-repo?type=static
      1. Follow the instructions to deploy
   3. Once deployed go to settings for frontend app
      1. In Redirect/Rewrite rules add:
         1. `/*` as Source
         2. `/index.html` as Destination
         3. And `Rewrite` as Action
   4. Now go to `Environment` and add:
      1. `REACT_APP_STRIPE_API_TEST_PK` to same Stripe API Key that you set in backend
      2. Add `REACT_APP_BACKEND_API_URL` and use the backend url from above after backend was deployed
      3. Add your `REACT_APP_MEDIA_URL` to the Cloudinary url. Something like this `https://res.cloudinary.com/xxxxxxx/image/upload/v1/` The `xxxxxxx` should be found in your cloudinary dashboard that you used in backend set up.
      4. Now add `REACT_APP_GA_ID` from your .env `REACT_APP_GA_ID` in local file.
      5. Finally take the Frontend url from the react frontend app and set it in the `backend app` on render.com's environmental variable `FRONTEND_URL` that you previously set up.

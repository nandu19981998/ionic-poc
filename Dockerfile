FROM --platform=linux/amd64 public.ecr.aws/lambda/nodejs:18

ARG API_KEY
ENV API_KEY=$API_KEY

ARG API_SECRET
ENV API_KEY=$API_SECRET

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

COPY web  ${LAMBDA_TASK_ROOT}/

# Install the application dependencies
RUN npm ci --production

# # Install expo-cli globally
# RUN npm install -g expo-cli

RUN cd frontend && npm install && npx ionic build --prod


# Start the server
CMD [ "lambda.handler" ]
# CMD ["npm", "run", "serve"]

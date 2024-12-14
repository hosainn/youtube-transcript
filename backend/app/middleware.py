import uuid, time
from fastapi import status, Request
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from config.logconfig import logger


class GeneralExceptionMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        try:
            response = await call_next(request)
            return response
        except Exception as e:
            logger.error("Failed to process request due to:" + str(e))
            return JSONResponse(
                {"error": "Internal server error"}, 
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        

class RequestLogMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        request_id = str(uuid.uuid4())
        start_time = time.time()
        log_dict = {
            "request_id": request_id,
            "url": request.url,
            "method": request.method,
            "request_ip": request.client.host
        }
        logger.info(log_dict)

        response = await call_next(request)

        response_log = {
            "request_id": request_id,
            "response_duration": f"{time.time() - start_time} sec" 
        }
        logger.info(response_log)

        return response
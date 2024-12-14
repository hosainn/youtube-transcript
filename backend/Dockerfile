FROM python:3.9

RUN groupadd -r transcriptuser && useradd -r -g transcriptuser transcriptuser

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./app /code

RUN mkdir -p /var/log/ \
    && chown -R transcriptuser /var/log/ \
    && chmod -R u+rX /var/log/

USER transcriptuser

EXPOSE 80

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--reload", "--port", "80"]

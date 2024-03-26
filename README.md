# Todo App

## Deployed

### Nginx

fix the error of ``` `x-forwarded-host` header with value `127.0.0.1:7779` does not match `origin` header with value```

``` bash
 server
    {
        listen 17777;
        server_name next-todo;
        location / {
            proxy_set_header x-forwarded-host "42.194.222.171:17777";
            proxy_pass http://127.0.0.1:7779/;
        }
    }
```

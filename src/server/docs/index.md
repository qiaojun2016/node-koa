
## Nginx 代理本地服务
*我想代理服务器上一个本地Node 服务 `http://localhost:3000/` 对外访问是 `http://tfdream.cn/api`*
```
tfdream.cn/api  ---> http://localhost:3000/
tfdream.cn/api/users  ---> http://localhost:3000/users
```

```
cd  /etc/nginx/conf.d
vim xxx.conf
```
输入
```shell
server {
    listen  80;
    server_name  tfdream.cn;

    location /api/ {
        proxy_pass http://127.0.0.1:3000/;
    }
}
```
**注意** : `/api/` 不要 写成 `/api`  proxy_pass末尾加 `/`

## Daily Worker
使用WorkManager实现一个每天的周期性的任务.在响应的 Worker里完成一次任务重新调用dailyWorker即可。
```kotlin
  private fun dailyWorker(context: Context) {
            val currentDate = Calendar.getInstance()

            val dueDate = Calendar.getInstance()
            // Set Execution around 05:00:00 AM
            dueDate.set(Calendar.HOUR_OF_DAY, 5)
            dueDate.set(Calendar.MINUTE, 0)
            dueDate.set(Calendar.SECOND, 0)
            if (dueDate.before(currentDate)) {
                dueDate.add(Calendar.HOUR_OF_DAY, 24)
            }
            val timeDiff = dueDate.timeInMillis  - currentDate.timeInMillis
            val dailyWorkRequest = OneTimeWorkRequestBuilder<LogUploadWorker>()
                .setInitialDelay(timeDiff, TimeUnit.MILLISECONDS)
                .build()
            WorkManager.getInstance(context).enqueue(dailyWorkRequest)
        }

```



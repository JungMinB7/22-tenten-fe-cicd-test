PORT=3000

for i in {1..10}; do
	echo "⌛ Waiting for container to warm up..."
	sleep 5
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:80)
  echo "Health check status: $STATUS"
  if [ "$STATUS" == "200" ]; then
    echo "✔ Health check passed."
    exit 0
  fi
  sleep 3
done

echo "✖ Health check failed after retries. Rolling back."
exit 1
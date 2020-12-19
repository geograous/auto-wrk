-- example reporting script which demonstrates a custom
-- done() function that prints latency percentiles as CSV

local fileName = "result.log"

done = function(summary, latency, requests)
   msg = string.format("%d,%d,%d;",summary.duration, summary.requests,  latency.mean)
   file = io.open(fileName, 'a')
   file:write(msg)
   file:close()
end

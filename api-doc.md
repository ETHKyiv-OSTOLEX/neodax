# Auth
## 1. Clearport
`wss://port-a.kayen.io`

challenge request:
```json
{"reqid":0,"event":"challenge","data":{"address":"0x44AFc24403cA6e6bdEFD69a11E7C140cc206A49C","name":"UserName"}}
```

challenge response:
```json
{"reqid":0,"event":"challenge","data":{"address":"0x44AFc24403cA6e6bdEFD69a11E7C140cc206A49C","name":"UserName"}}
```

auth request:
```json
{"reqid":1,"event":"authenticate","data":{"address":"0x44AFc24403cA6e6bdEFD69a11E7C140cc206A49C","signature":"0x365a2116a812687ff968560f16bde752ef9d762bc495c735537dd36f32b1ec3f4bfc62004050be217180e1f37a64b8661322a6b582e89a5b2d1bf093fa47e0991c"}}
```

auth response:
```json
{"reqid":1,"event":"authenticate","data":{"jwt_token":"eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJvcGVyYXRvcl9hZGRyZXNzIjoiMHg0NEFGYzI0NDAzY0E2ZTZiZEVGRDY5YTExRTdDMTQwY2MyMDZBNDlDIiwiZXhwIjoxNzE5MDgzNDAyfQ.ss4da0UFrWN3XUofLhw8bdXgWfu_jFQw1ZWvE_gKvzoi2565u09f15AyKS-o--DXeOOoXLff3DymnqWMMdL29gE"}}
```

subscribe to notifications:
```json
{"reqid":2,"event":"subscribe_notifications"}
```

open channel request:
```json
{"reqid":3,"event":"open_channel","data":{"peer":{"address":"0x269F993271D845efBc7298d9EbC2be557Cc5284e","url":"http://clearport-peer-grpc.kayen-prod:50081","name":"BlockSafeguard"},"margin_deposit":"1"}}
```

open channel response:
```json
{"reqid":3,"event":"open_channel","data":{"channel_id":"0xef6570a709f664572673eaeb2d8a1ac2a70c867626c18f30d4b406acc8d00746"}}
```

process notification of channel being successfully funded:
```json
{"reqid":2,"event":"stream_notification","data":{"channel_id":"0xef6570a709f664572673eaeb2d8a1ac2a70c867626c18f30d4b406acc8d00746","action":"channel_opening","channel_state":"open","clearing_sm_state":"funded","my_role":"Initiator","peer":{"address":"0x269F993271D845efBc7298d9EbC2be557Cc5284e","url":"clearport-peer-grpc.kayen-prod:50081","name":"BlockSafeguard"},"margin_deposit":"1","initiator_margin_balance":"1","responder_margin_balance":"1","turn_num":1}}
```

channel jwt request:
```json
{"reqid":4,"event":"channel_jwt","data":{"channel_id":"0xef6570a709f664572673eaeb2d8a1ac2a70c867626c18f30d4b406acc8d00746"}}
```

channel jwt response:
```json
{"reqid":4,"event":"channel_jwt","data":{"jwt":"eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJjaGFubmVsX2lkIjoiMHhlZjY1NzBhNzA5ZjY2NDU3MjY3M2VhZWIyZDhhMWFjMmE3MGM4Njc2MjZjMThmMzBkNGI0MDZhY2M4ZDAwNzQ2IiwiYWRkcmVzcyI6IjB4REEzRTIxMTEzN2JmRjU4YkFFMzI3OGI2ZjU3MjQyNDFiNjI1RUY4OSIsImV4cCI6MTcxOTA2MTk2OX0.0I0yoROqMqpqGehZtrjvAqMZAtVFdBvnUEuBUBQA5ANAIihoNbs2LnOJnO0lVLAUyZHoJnZ6nWabO2borl06nAE"}}
```

## 2. Finex
`wss://kayen.io/ws`

auth with websocket api:
```json
[1,1,"auth",["jwt-token-from-step-above"]]
```

# Trade

## 1. Finex
`wss://kayen.io/ws`

create order:
```json
[
  1,
  14,
  "create_order",
  [
    "pepeusd",
    "m", // m = market order, l = limit order
    "buy",
    "108506.94444444",
    "0.00001152",
    ""
  ]
]
```

close order = open reversed order (buy → sell; sell → buy)
```json
[1,14,"create_order",["pepeusd","m","sell","108506.94444444","",""]]
```

## 2. Clearport
`wss://port-a.kayen.io`

For each NEW order cleaport sends `record_trade` notification:
```json
{"reqid":7,"event":"record_trade","data":{"channel_id":"0xef6570a709f664572673eaeb2d8a1ac2a70c867626c18f30d4b406acc8d00746","external_id":"172783"}}
```

Clearport sends position update with batched details for each order:
```json
{"reqid":2,"event":"position_notification","data":{"position":{"id":"7c4a3368-3079-4eae-a0d1-a15c9627cb3d","channel_id":"0xef6570a709f664572673eaeb2d8a1ac2a70c867626c18f30d4b406acc8d00746","market":"PEPE/USD","direction":"buy","amount":"108506.94444444","cost":"1.2499999999999488","market_value":"1.2467447916666156","average_entry_price":"0.00001152","pnl":"-0.0032552083333332","status":"open"}}}
```

# Settle
`wss://port-a.kayen.io`

close channel request:
```json
{"event":"close_channel","reqid":1,"data":{"channel_id":"0xef6570a709f664572673eaeb2d8a1ac2a70c867626c18f30d4b406acc8d00746"}}
```

you'll receive multiple notifications on stream status up until it is finalized (finalized = stream closed & funds sent to user wallet).

state can be `finalizing`, `concluding`, `finalized`:
```json
{"reqid":2,"event":"stream_notification","data":{"channel_id":"0xef6570a709f664572673eaeb2d8a1ac2a70c867626c18f30d4b406acc8d00746","action":"channel_opened","channel_state":"open","clearing_sm_state":"finalizing","my_role":"Initiator","peer":{"address":"0x269F993271D845efBc7298d9EbC2be557Cc5284e","url":"clearport-peer-grpc.kayen-prod:50081","name":"BlockSafeguard"},"margin_deposit":"1","initiator_margin_balance":"0.99349","responder_margin_balance":"1.00651","turn_num":2}}
```
the exact semantics of those events does not matter for now since it's an implementation detail. think of it this way -- if you're receiving these notifications, then channel closure is still in progress.

channel closed notification:
```json
{"reqid":1,"event":"close_channel","data":{"channel_id":"0xef6570a709f664572673eaeb2d8a1ac2a70c867626c18f30d4b406acc8d00746"}}
```

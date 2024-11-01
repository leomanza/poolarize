Gregor Mitscha-Baude
2:02 p.m.
https://github.com/zksecurity/mina-credentials
David Sedgwick
2:03 p.m.
for new joiners: https://github.com/zksecurity/mina-credentials
Paul's Notetaker
2:03 p.m.
Hi, I'm an AI assistant helping Paul ZKON take notes for this meeting. Follow along the transcript here:  https://otter.ai/u/5uKcPttJpRu3e8YghAK68QbWVhk?utm_source=va_chat_link_1

You'll also be able to see screenshots of key moments, add highlights, comments, or action items to anything being said, and get an automatic summary after the meeting.
Tomasz Marciniak
2:04 p.m.
yet is the keyword
Karol Podufalski
2:06 p.m.
is it built on Circuit string? 1 field per character?
Karol Podufalski
2:07 p.m.
ok, nice!
Immanuel Segol
2:15 p.m.
is the app id a secret ?
ok cool thanks
Emre Akbas
2:15 p.m.
Is app id is requesters id?
Julian Dreissig
2:20 p.m.
But a hash over the credential will allow the verifier to uniquely identify the credential?
But that's bad for tracking
Omer Piconbello
2:21 p.m.
counter anonymity?
Emre Akbas
2:27 p.m.
Is there a limitation to acceptedNations variable?
Paul's Notetaker
2:39 p.m.
Takeaways from the meeting 👉💬 

[ ] Explore ways to visually represent the content of the credential circuit to better communicate what information is being shared. (Speaker unknown)
[ ] Investigate techniques like Merkle trees to handle large sets of accepted issuers or nationalities in the circuit. (Speaker unknown)

See full summary - https://otter.ai/u/5uKcPttJpRu3e8YghAK68QbWVhk?utm_source=va_chat&utm_content=wrapup_v4&tab=chat&message=fb720876-ed29-4533-a6f6-75c2481f07ee
David Sedgwick
2:47 p.m.
FYI: As promised at MinaCon, I am going to set up a dedicated Discord channel tomorrow  to cover all the credential work so we can all keep aligned on the great work that is going on
Tomasz Marciniak
2:48 p.m.
may be helpful for QR code transport:
https://github.com/palladians/silex/blob/main/src/lib/transport.ts
(done an airgap mina vault some time ago)
Egemen Göl
2:48 p.m.
Hi David, can you share your discord handle to connect so that I can participate as well
David Sedgwick
2:49 p.m.
davewedge
and yours so i can ping you when it's up? :)
Tú
2:50 p.m.
would love to join the Discord channel too
leamanza
David Sedgwick
2:50 p.m.
of course, I'll ping everyone from this call ;)
Tomasz Marciniak
2:55 p.m.
btw, ran the unique hash spec on my m2 max and it's only 27s, awesome work
Tú
2:55 p.m.
thanks!
Mario Zito
2:55 p.m.
Thanks !
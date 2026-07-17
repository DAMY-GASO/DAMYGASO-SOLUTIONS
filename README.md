# Damygaso Tech — Official Website

Tovuti rasmi ya **Damygaso Tech**, kampuni ya teknolojia yenye makao Ukonga, Dar es Salaam, inayohudumia Tanzania nzima kwa huduma tatu kuu: **IT Support**, **Graphic & Brand Design**, na **Website & App Development**.

🔗 Live: [https://www.damygasotech.com](https://www.damygasotech.com)

---

## Kuhusu Mradi

Tovuti hii ni multi-page business website iliyojengwa kwa HTML/CSS/JS bila framework, ikiwa na msaada wa lugha mbili (Kiswahili na Kiingereza) unaobadilishwa moja kwa moja bila kupakia upya ukurasa.

### Kurasa (Pages)
| Faili | Maelezo |
|---|---|
| `index.html` | Ukurasa wa nyumbani — huduma, why-choose-us, testimonials, FAQs |
| `services.html` | Maelezo kamili ya huduma + booking form |
| `portfolio.html` | Mifano ya miradi iliyofanywa |
| `about.html` | Historia ya kampuni, dira/dhamira, timu |
| `contact.html` | Fomu ya mawasiliano |
| `privacy-policy.html` | Sera ya faragha |
| `terms.html` | Masharti na vigezo |

Blog inaendeshwa kwenye subdomain tofauti: [blog.damygasotech.com](https://blog.damygasotech.com)

---

## Vipengele Muhimu (Features)

- **Bilingual (SW/EN)** — maandishi yote yapo kwenye DOM kwa lugha zote mbili (`data-sw` / `data-en` attributes), yanabadilishwa na `assets/script.js` bila kuathiri SEO
- **Responsive design** — mobile, tablet, na desktop
- **WhatsApp integration** — floating button + booking links zenye pre-filled message
- **Offcanvas mobile menu** — navigation rahisi kwa simu
- **FAQ accordion** — maswali yanayoulizwa mara kwa mara
- **SEO-optimized** — meta tags za kipekee kwa kila ukurasa, Open Graph, Twitter Cards, na JSON-LD structured data (Organization, Service, ContactPage, n.k.)

---

## Muundo wa Faili (Project Structure)

```
/
├── index.html
├── services.html
├── portfolio.html
├── about.html
├── contact.html
├── privacy-policy.html
├── terms.html
├── sitemap.xml
├── robots.txt
├── assets/
│   ├── style.css
│   ├── script.js
│   └── images/
│       ├── logo.png
│       ├── logo-white.png
│       ├── logo-512.png
│       └── favicon.png
```

---

## SEO Setup

- `sitemap.xml` na `robots.txt` zipo kwenye root ya domain, zinazorejelewa na Google Search Console
- Kila ukurasa una `canonical`, `og:*`, na `twitter:*` meta tags za kipekee
- JSON-LD structured data imewekwa kwa kila ukurasa kulingana na aina yake (`Organization`, `Service`, `AboutPage`, `ContactPage`, `WebPage`)

---

## Jinsi ya Ku-deploy

1. Pakia faili zote kwenye root ya hosting/server ya `www.damygasotech.com`
2. Hakikisha `sitemap.xml` na `robots.txt` zinapatikana:
   - `https://www.damygasotech.com/sitemap.xml`
   - `https://www.damygasotech.com/robots.txt`
3. Wasilisha sitemap kwenye [Google Search Console](https://search.google.com/search-console)
4. Thibitisha structured data kwa [Google Rich Results Test](https://search.google.com/test/rich-results)

---

## Mawasiliano

- **Simu / WhatsApp:** +255 743 322 107
- **Eneo:** Ukonga - Mombasa, Dar es Salaam, Tanzania
- **Facebook:** [facebook.com/damygaso](https://www.facebook.com/damygaso)
- **Instagram:** [instagram.com/damygaso](https://www.instagram.com/damygaso)
- **TikTok:** [tiktok.com/@damygaso](https://www.tiktok.com/@damygaso)

---

© Damygaso Tech. Haki zote zimehifadhiwa.

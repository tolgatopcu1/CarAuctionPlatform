# 🚗 Car Auction Platform

Modern, güvenli ve kullanıcı dostu bir **araç açık artırma platformu**. Kullanıcılar araç listeleyebilir, teklif verebilir, ödemelerini Stripe ile gerçekleştirebilir ve satış yapabilir. Tamamen responsive, sade ve güçlü bir kullanıcı deneyimi sunar.

![Banner](./screenshots/home.png)

---

## 📱 Özellikler

### 👤 Kullanıcı Paneli
- Kayıt olma ve giriş yapma (JWT tabanlı kimlik doğrulama)
- Kullanıcı profili üzerinden:
  - **Koyduğu araçları** görme
  - **Verdiği teklifleri** takip etme
  - Kazandığı teklifler için **ödeme yapma**
- Stripe entegrasyonu ile güvenli ödeme

### 🚙 Araç Satışı
- Araç listeleme (resim, başlık, açıklama, başlangıç fiyatı, açık artırma süresi vb.)
- Araçlara gelen teklifleri görüntüleme
- Araç satış geçmişi

### 🧠 Sistem Özellikleri
- Tamamen **responsive** frontend tasarımı (mobil, tablet, desktop uyumlu)
- Stripe ile **güvenli ödeme entegrasyonu**
- RESTful API ile modern mimari
- Kullanıcı bazlı veri filtreleme ve erişim kontrolü

---

## 🖼️ Ekran Görüntüleri


### 🔐 Giriş Sayfası
![Login](./screenshots/login.png)

### 🚘 Araç Detay Sayfası
![Vehicle Detail](./screenshots/vehicle-detail.png)

### 💸 Ödeme Sayfası
![Vehicle Detail](./screenshots/payment1.png)


### 👤 Kullanıcı Profili
![Profile](./screenshots/profile.png)

### 👤 Kullanıcı Araç Kazanma Sayfası
![Profile](./screenshots/win.png)

### 👤 Kullanıcı Araç Satış Onayı Sayfası
![Profile](./screenshots/sell.png)

---

## ⚙️ Kurulum

### 🔽 1. Reposu Klonla
```bash
git clone https://github.com/tolgatopcu1/CarAuctionPlatform.git
cd CarAuctionPlatform

### 🔧 2. Backend'i Başlatın (.NET 9)
Backend, ASP.NET Core 9 ile geliştirilmiştir.

```bash
cd AuctionProject
dotnet restore          # Gerekli NuGet paketlerini yükler
dotnet ef database update # Veritabanı migrasyonlarını uygular
dotnet run              # Backend servisini başlatır

---

### Frontend'i Başlatın (React + Vite) Bölümü

```markdown
### 💻 3. Frontend'i Başlatın (React + Vite)
Frontend, React ve Vite ile geliştirilmiştir.

```bash
cd AuctionProjectClient/MyAuctionClientApp
npm install             # Gerekli Node.js paketlerini yükler
npm run dev             # Geliştirme sunucusunu başlatır

---

### Kullanıcı Akışı Bölümü

```markdown
## 🚀 Kullanıcı Akışı

Platformdaki temel bir kullanıcı etkileşimi döngüsü aşağıdaki gibidir:

1.  **Kayıt ve Giriş:** Kullanıcı kaydolur ve platforma güvenli bir şekilde giriş yapar.
2.  **Araç Keşfi:** Kullanıcı araç listeleyebilir veya mevcut listelenmiş araçlara göz atabilir.
3.  **Teklif Verme:** İlgilendiği bir araca teklif verir.
4.  **Açık Artırma Kazanma:** Açık artırmayı kazanması durumunda ödeme sayfasına yönlendirilir.
5.  **Güvenli Ödeme:** Stripe ile güvenli bir şekilde ödeme yapar ve aracın sahibi olur.
6.  **Geçmiş Takibi:** Profil sayfasından geçmiş araçlarını, verdiği teklifleri ve kazandığı/kaybettiği açık artırmaları görüntüleyebilir.


## ✉️ İletişim

**Tolga Topçu**
* 💼 [LinkedIn Profilim](https://www.linkedin.com/in/tolgatopcu1)
* 🐙 [GitHub Profilim](https://github.com/tolgatopcu1)



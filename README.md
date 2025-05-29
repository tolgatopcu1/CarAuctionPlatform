# 🚗 Car Auction Platform

Modern, güvenli ve kullanıcı dostu bir **araç açık artırma platformu**. Kullanıcılar araç listeleyebilir, teklif verebilir, ödemelerini Stripe ile gerçekleştirebilir ve satış yapabilir. Tamamen responsive, sade ve güçlü bir kullanıcı deneyimi sunar.

![Banner](./screenshots/banner.png)

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

🔧 2. Backend'i Başlat (.NET 9)
cd AuctionProject
dotnet restore
dotnet ef database update
dotnet run

💻 3. Frontend’i Başlat (React + Vite)
cd AuctionProjectClient/MyAuctionClientApp
npm install
npm run dev

## 🔄 Kullanıcı Akışı

👤 Kullanıcı kayıt olur ve giriş yapar.

🚘 Araç listeleyebilir veya listelenmiş araçlara göz atabilir.

💰 İlgilendiği araca teklif verir.

🏆 Açık artırmayı kazanırsa ödeme sayfasına yönlendirilir.

💳 Stripe ile güvenli ödeme yapar ve araç kendisine ait olur.

👤 Profil sayfasından geçmiş araçlar ve teklifler görüntülenebilir.

## 🤝 Katkı Sağlamak İster Misin?

Bu projeye katkı sağlamak istersen:

1. Bu repository’yi forkle  
2. Yeni bir branch oluştur (`feature/ekleme`)  
3. Geliştirmelerini yap  
4. Pull Request gönder  

Her katkıyı memnuniyetle karşılıyoruz! 🙌


## ✉️ İletişim

**Tolga Topçu**  
💼 [LinkedIn Profilim](https://www.linkedin.com/in/tolgatopcu1)  
🐙 [GitHub Profilim](https://github.com/tolgatopcu1)



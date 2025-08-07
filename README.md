# 🕷️ Web Parser Guide

Welcome! This guide will help you get started with creating and using web parsers on our platform.

---

## 📌 How to Create a Parser

### 🔐 1. Registration

To start using the parser, you first need to **register** on the website:

- Choose a **unique username**
- Set a **secure password**

Once registered, you’ll gain access to all parser features.

---

### 🛠️ 2. Choosing a Parser

There are **two types of parsers** available on the website:

#### 🧠 Flexible Parser

- Ideal for **any type of website**, including dynamic ones
- Features:
  - Take **screenshots**
  - **Input data** into form fields
  - **Wait for specific content** to load
  - **Extract data** by `class`, `id`, `tag`, or any attribute
  - **Click elements`
- ⚠️ Slower, but more powerful and versatile

#### ⚡ Fast Parser

- Works best for **static websites**
- **Very fast** and lightweight
- Can:
  - Extract data by `class`, `id`, `tag`, or attribute
- ❗ Not suitable for **dynamic or interactive sites**

---

### 🧾 3. Creating a Parser

Go to the **"Create Parser"** section:

- To select the **Flexible Parser**, click **once**
- To select the **Fast Parser**, click **a second time**

Then:

1. Fill out the configuration form
2. Press **"Run Parser"** to test if everything works correctly
3. If it works — click **"Create Parser"** to save it

---

### 🧪 4. Flexible Parser Features

- Data extraction functions:
  - **`data`** — gets **a single element**
  - **`alldata`** — gets **all matching elements**
- Other powerful features:
  - Wait for content to appear
  - Input text into fields
  - Click buttons and elements
  - Take full-page screenshots

---

### 💡 5. How to Fill Out the Form

To correctly find the `id`, `class`, `tag`, or attribute of the element you want to scrape:

1. Open the target website
2. Press **F12** to open Developer Tools
3. Select the element you want
4. Copy the appropriate identifier (`class`, `id`, `tag`, or attribute)
5. Paste it into the form fields on the parser page

---

### ⚠️ Notes & Tips

- For **dynamic websites**, always use the **Flexible Parser**
- Use `alldata` when you want to grab **multiple elements**
- Test your parser with **"Run Parser"** before saving

---

Happy parsing! 🥳
"""
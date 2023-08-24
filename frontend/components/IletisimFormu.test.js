import React from "react";
import { getByText, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import IletisimFormu from "./IletisimFormu";

test("hata olmadan render ediliyor", () => {
  render(<IletisimFormu />);
});

test("iletişim formu headerı render ediliyor", () => {
  render(<IletisimFormu />);
  const iletisimHeader = screen.getByText(/İletişim Formu/i);
  expect(iletisimHeader).toBeInTheDocument();
});

test("kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.", async () => {
  render(<IletisimFormu />);
  const isim = screen.getAllByPlaceholderText("İlhan");
  userEvent.type(isim[0], "abcd");
  const errorMessage = screen.getByText(
    /Hata: ad en az 5 karakter olmalıdır./i
  );
  expect(errorMessage).toBeVisible();

  userEvent.type(isim[0], "e");
  expect(errorMessage).not.toBeVisible();
});

test("kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.", async () => {
  render(<IletisimFormu />);
  const buton = screen.getByText(/GÖNDER/i);
  userEvent.click(buton);
  const errorAd = screen.getByText(/Hata: ad en az 5 karakter olmalıdır./i);
  const errorSoyAd = screen.getByText(/Hata: soyad gereklidir./i);
  const errorEmail = screen.getByText(
    /Hata: email geçerli bir email adresi olmalıdır./i
  );
  expect(errorAd).toBeVisible();
  expect(errorSoyAd).toBeVisible();
  expect(errorEmail).toBeVisible();
});

test("kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.", async () => {
  render(<IletisimFormu />);
  const myName = screen.getByPlaceholderText(/İlhan/i);
  userEvent.type(myName[0], "Battal");

  const mySurname = screen.getByPlaceholderText(/Mansız/i);
  userEvent.type(mySurname[0], "Arvas");

  const butonn = screen.getByText(/gönder/i);
  userEvent.click(butonn);

  const errorMail = screen.getByText(
    /Hata: email geçerli bir email adresi olmalıdır./i
  );
  expect(errorMail).toBeVisible();
});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
  render(<IletisimFormu />);
  const mail = screen.getByPlaceholderText(/yüzyılıngolcüsü@hotmail.com/i);
  userEvent.type(mail, "Battal");

  const errorMessageEmail = screen.getByText(
    /Hata: email geçerli bir email adresi olmalıdır./i
  );

  expect(errorMessageEmail).toBeInTheDocument();
});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
  render(<IletisimFormu />);
  const isim = screen.getByPlaceholderText(/İlhan/i);
  userEvent.type(isim, "Battal");

  const mail = screen.getByPlaceholderText(/yüzyılıngolcüsü@hotmail.com/i);
  userEvent.type(mail, "battalarvas@gmail.com");

  const buton = screen.getByText(/gönder/i);

  userEvent.click(buton);

  const errorMessageEmail = screen.getByText(/Hata: soyad gereklidir./i);

  expect(errorMessageEmail).toBeInTheDocument();
});

test("ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.", async () => {
  render(<IletisimFormu />);
  const isim = screen.getByPlaceholderText(/İlhan/i);
  userEvent.type(isim, "Battal");

  const soyİsim = screen.getByPlaceholderText("Mansız");
  userEvent.type(soyİsim, "Arvas");

  const mail = screen.getByPlaceholderText(/yüzyılıngolcüsü@hotmail.com/i);
  userEvent.type(mail, "battalarvas@gmail.com");

  const buton = screen.getByText(/gönder/i);

  userEvent.click(buton);

  const errorMessage = screen.queryAllByTestId("error");
  expect(errorMessage).toHaveLength(0);
});

test("form gönderildiğinde girilen tüm değerler render ediliyor.", async () => {
  render(<IletisimFormu />);
});

import { Request, Response } from "express";
import prismaService from "../../prisma/prismaService";
import { AddressTypes } from "../interfaces/address.interface";

export default new (class {
  async createAddress(req: Request, res: Response): Promise<void> {
    const { country, state, city, zone, apartmentUnite, postalCode, userId } =
      req.body;

    try {
      await prismaService.addreesses.create({
        data: {
          country,
          state,
          city,
          zone,
          apartmentUnite,
          postalCode,
          userId,
        },
      });
      res.status(201).json({
        message: "Success",
        statusCode: 201,
        response:
          "The address was created with such specification successfully.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error",
        statusCode: 500,
        response: "An error occurred while creating address.",
      });
    }
  }
  async getAddresses(req: Request, res: Response): Promise<void> {
    const { searchTerm, user, userId } = req.query;
    try {
      const contain: { contains: string } = {
        contains: searchTerm as string,
      };
      let include: any = {};
      if (user === "true") {
        include = { user: true };
      }

      const addresses: AddressTypes[] = await prismaService.addreesses.findMany(
        {
          where: {
            OR: [
              { addressId: contain },
              { country: contain },
              { state: contain },
              { city: contain },
              { zone: contain },
              { apartmentUnite: Number(contain) },
              { postalCode: contain },
              { userId: contain },
            ],
            userId: userId as string,
          },
          include,
        }
      );

      res.status(200).json({
        message: "Success",
        statusCode: 200,
        addresses,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error",
        statusCode: 500,
        response: "An error occurred while getting addresses of users.",
      });
    }
  }
  async getAddressById(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    const addressId: string = req.params.addressId;
    try {
      const address: AddressTypes | null =
        await prismaService.addreesses.findFirst({
          where: {
            addressId,
          },
        });
      if (!address) {
        return res.status(404).json({
          message: "Failed",
          statusCode: 404,
          response: "There is no any address with such id.",
        });
      }
      return res.status(200).json({
        message: "Success",
        statusCode: 200,
        address,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error",
        statusCode: 500,
        response: "An error occurred while getting address with such id.",
      });
    }
  }
  async updateAddress(req: Request, res: Response): Promise<void> {
    const {
      addressId,
      country,
      state,
      city,
      zone,
      apartmentUnite,
      postalCode,
      userId,
    } = req.body;

    try {
      await prismaService.addreesses.update({
        data: {
          country,
          state,
          city,
          zone,
          apartmentUnite,
          postalCode,
          userId,
        },
        where: {
          addressId,
        },
      });
      res.status(200).json({
        message: "Success",
        statusCode: 200,
        response: "Desire address was updated successfully.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error",
        statusCode: 500,
        response: "An error occurred while updating addresses.",
      });
    }
  }
  async deleteAddress(req: Request, res: Response): Promise<void> {
    const addressId: string = req.params.addressId;
    try {
      await prismaService.addreesses.delete({
        where: {
          addressId,
        },
      });

      res.status(200).json({
        message: "Success",
        statusCode: 200,
        response: "Desire address was deleted successfully.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error",
        statusCode: 500,
        response: "An error occurred while deleting address.",
      });
    }
  }
})();
